import {Models} from "appwrite";

export interface Board {
    columns: Map<TypedColumn, Column>
}

type TypedColumn = "todo" | "inprogress" | "done"

export interface Column {
    id: TypedColumn;
    todos: Todo[]
}

interface Todo extends Models.Document {
    $id: string;
    $createdAt: string;
    title: string;
    status: TypedColumn;
    image?: Image;
}

interface Image {
    bucketId: string;
    fileId: string;
}
