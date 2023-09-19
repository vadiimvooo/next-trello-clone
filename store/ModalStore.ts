import {create} from "zustand";
import {TypedColumn} from "@/typings";

interface ModalState {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    newTaskInput: string;
    setNewTastInput: (input: string) => void;
    newTaskType: TypedColumn;
    setNewTaskType: (type: TypedColumn) => void;
    image: File | null,
    setImage: (image: File | null) => void;
}

export const useModalStore = create<ModalState>()((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    newTaskInput: "",
    setNewTastInput: (input) => set({ newTaskInput: input }),
    newTaskType: "todo",
    setNewTaskType: (type) => set({ newTaskType: type }),
    image: null,
    setImage: (image) => set({ image })
}))
