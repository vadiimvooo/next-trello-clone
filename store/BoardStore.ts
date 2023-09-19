import {create} from "zustand";
import {Board, Column, Image, Todo, TypedColumn} from "@/typings";
import {getTodosGroupedByColumn} from "../lib/getTodosGroupedByColumn";
import {databases, ID, storage} from "../appwrite";
import * as process from "process";
import {uploadImage} from "../lib/uploadImage";
import {useModalStore} from "@/store/ModalStore";

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;

    searchString: string,
    setSearchString: (searchString: string) => void,

    addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void,
    deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void
}

export const useBoardStore = create<BoardState>((set, get) => ({
    board: {
        columns: new Map<TypedColumn, Column>()
    },
    getBoard: async () => {
        const board = await getTodosGroupedByColumn();
        set({ board });
    },
    setBoardState: (board) => set({ board }),
    updateTodoInDB: async (todo, columnId) => {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DB_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
            {
                title: todo.title,
                status: columnId
            }
        )
    },
    searchString: "",
    setSearchString: (searchString) => set({ searchString }),
    addTask: async (todo, columnId, image?: File | null) => {
        const setNewTastInput = useModalStore.getState().setNewTastInput;
        let file: Image | undefined;

        if (image) {
            const fileUploaded = await uploadImage(image);
            if (fileUploaded) {
                file = {
                    bucketId: fileUploaded.bucketId,
                    fileId: fileUploaded.$id
                }
            }
        }

        const { $id } = await databases.createDocument(
            process.env.NEXT_PUBLIC_DB_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            ID.unique(),
            {
                title: todo,
                status: columnId,
                ...(file && { image: JSON.stringify(file) })
            }
        );

        setNewTastInput("");

        set((state) => {
            const newColumns = new Map(state.board.columns);

            const newTodo: Todo = {
                $id,
                $createdAt: new Date().toISOString(),
                title: todo,
                status: columnId,
                ...(file && { image: file })
            }

            const column = newColumns.get(columnId);

            if (!column) {
                newColumns.set(columnId, {
                    id: columnId,
                    todos: [newTodo]
                });
            } else {
                newColumns.get(columnId)?.todos.push(newTodo);
            }

            return {
                board: {
                    columns: newColumns
                }
            }
        })
    },
    deleteTask: async (taskIndex, todo, id) => {
        const newColumns = new Map(get().board.columns);
        newColumns.get(id)?.todos.splice(taskIndex, 1);
        set({ board: { columns: newColumns } })

        if (todo.image) {
            await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
        }

        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_DB_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID,
            todo.$id
        );
    }
}))
