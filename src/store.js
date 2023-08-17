import { create } from "zustand";
import {devtools} from "zustand/middleware"

const store = (set) => ({
    //initial state define an arrow function with a paramenter and it is gonna return an object
    tasks: [{ title: "TestTask", state: "ongoing" }],
    addTask: (title, state) =>
        set((store) => ({
            tasks: [...store.tasks, { title, state }],
        })),
    deleteTask: (title) =>
        set((store) => ({
            tasks: store.tasks.filter((task) => task.title !== title),
        })),
    draggedTask: null,
    setDraggedTask: (title) => set({
        draggedTask: title
    }),
    moveTask: (title, state) => set(store => ({
        tasks: store.tasks.map(task => task.title === title ? { title, state } : task)
    }))
});
export const useStore = create(devtools(store) );
