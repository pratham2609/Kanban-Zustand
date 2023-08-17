import { create } from "zustand";
import { devtools, persist } from "zustand/middleware"
//persist manages and stores the state

const store = (set) => ({
    //initial state define an arrow function with a paramenter and it is gonna return an object
    tasks: [],
    addTask: (title, state) =>
        set((store) => ({
            tasks: [...store.tasks, { title, state }],
        }),
        //if not willing to use spread operator use immer
            false, //boolean so that it should not to replace or change other functions
            "addTask"
        ),
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

const log =(config) =>(set,get,api) => config(
    (...args) => {
        console.log(args)
        set(...args)
    },
    get,
    api
)
export const useStore = create(log(persist(devtools(store), { name: "store " })));
