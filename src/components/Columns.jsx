import React from "react";
import "./Column.css";
import Task from "./Task";
// import { shallow } from "zustand/shallow"
import { useStore } from "../store";
export default function Columns({ state }) {
    const [text, setText] = React.useState("");
    const [drop,setDrop]= React.useState(false)
    const [open, setOpen] = React.useState("");
    const tasks = useStore(
        (store) => store.tasks.filter((task) => task.state === state)
        // , shallow
    );
    const setDraggedTask = useStore((store) =>
        store.setDraggedTask
    );
    const draggedTask = useStore((store) =>
        store.draggedTask
    );
    const moveTask = useStore((store) =>
        store.moveTask
    );
    const addTask = useStore((store) => store.addTask);
    //zustand provides a function which can only re render under certain circumstances

    // or use useMemo not to re render the component again and again
    // const filtered = useMemo(() => tasks.filter((task) => task.state === state), [tasks, state])
    return (
        <div className={"column " + (drop ? "drop" : "")} onDragOver={(e) => {
            setDrop(true)
            e.preventDefault()}}
            onDragLeave={e=>{
                setDrop(false)
            }}
            onDrop={e => {
                moveTask(draggedTask,state)
                setDraggedTask(null)
            }}
        >
            <div className="titleWrapper">
                <p>{state}</p>
                <button onClick={() => setOpen(true)}>ADD</button>
            </div>
            {tasks.map((task) => (
                <Task title={task.title} key={task.title} />
            ))}
            {open && (
                <div className="Modal">
                    <div className="modalContent">
                        <input onChange={(e) => setText(e.target.value)} value={text} />
                        <button
                            onClick={() => {
                                addTask(text, state);
                                setText("");
                                setOpen(false);
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
