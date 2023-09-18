'use client'

import {Todo, TypedColumn} from "@/typings";
import {DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps} from "react-beautiful-dnd";
import {XCircleIcon} from "@heroicons/react/20/solid";
import {useBoardStore} from "@/store/BoardStore";

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

export const TodoCard = ({
    todo,
    index,
    id,
    innerRef,
    draggableProps,
    dragHandleProps
}: Props) => {
    const [deleteTask] = useBoardStore((state) => [
        state.deleteTask
    ])

    return (
        <div
            className="bg-white rounded-md space-y-2 drop-shadow-md"
            {...dragHandleProps}
            {...draggableProps}
            ref={innerRef}
        >
            <div className="flex justify-between items-center p-5">
                <p>{todo.title}</p>
                <button onClick={() => deleteTask(index, todo, id)} className="text-red-500 hover:text-red-600">
                    <XCircleIcon className="ml-5 h-8 w-8"/>
                </button>
            </div>

        {/*  Add image here...  */}
        </div>
    );
};
