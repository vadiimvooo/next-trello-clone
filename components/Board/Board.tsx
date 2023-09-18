'use client'

import { memo } from "react";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import {useEffect} from "react";
import {useBoardStore} from "@/store/BoardStore";
import {Column as IColumn} from "@/typings";
import {Column} from "@/components/Column";
export const Board = memo(() => {
    const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(state => [
        state.board,
        state.getBoard,
        state.setBoardState,
        state.updateTodoInDB
    ]);

    useEffect(() => {
        getBoard();
    }, [getBoard]);

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type} = result;

        if (!destination) return;

        if (type === "column") {
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const rearrangeColumns = new Map(entries);
            setBoardState({
                ...board,
                columns: rearrangeColumns
            });
        }

        const columns = Array.from(board.columns);
        const startColIndex = columns[Number(source.droppableId)];
        const finishColIndex = columns[Number(destination.droppableId)];

        const startCol: IColumn = {
            id: startColIndex[0],
            todos: startColIndex[1].todos
        }

        const finishCol: IColumn = {
            id: finishColIndex[0],
            todos: finishColIndex[1].todos
        }

        if (!startCol || !finishCol) return;

        if (source.index === destination.index && startCol === finishCol) return;

        const newTodos = startCol.todos;
        const [todoMoved] = newTodos.splice(source.index, 1);

        if (startCol.id === finishCol.id) {
            newTodos.splice(destination.index, 0, todoMoved);
            const newCol: IColumn = {
                id: startCol.id,
                todos: newTodos
            };
            const newColumns = new Map(board.columns);
            newColumns.set(startCol.id, newCol);
            setBoardState({
                ...board,
                columns: newColumns
            })
        } else {
            const destinationTodos = finishCol.todos;
            destinationTodos.splice(destination.index, 0, todoMoved);
            const newColumns = new Map(board.columns);
            const sourceCol: IColumn = {
                id: startCol.id,
                todos: newTodos
            };
            const destinationCol: IColumn = {
                id: finishCol.id,
                todos: destinationTodos
            }
            newColumns.set(startCol.id, sourceCol);
            newColumns.set(finishCol.id, destinationCol);

            updateTodoInDB(todoMoved, finishCol.id);

            setBoardState({
                ...board,
                columns: newColumns
            })
        }
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable
                droppableId="board"
                direction="horizontal"
                type="column"
            >
                {(provided) => (
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >{
                        Array.from(board.columns.entries())
                            .map(([id, column], index) => (
                                <Column
                                    key={id}
                                    id={id}
                                    todos={column.todos}
                                    index={index}
                                />
                            ))
                    }</div>
                )}
            </Droppable>
        </DragDropContext>
    );
});
