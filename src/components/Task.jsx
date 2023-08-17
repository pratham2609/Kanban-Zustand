import React from "react";
import "./Task.css";
import { useStore } from "../store";
import { AiTwotoneDelete } from "react-icons/ai";
export default function Task({ title }) {
    const task = useStore((store) =>
        store.tasks.find((task) => task.title === title)
    );
    const deleteTask = useStore((store) =>
        store.deleteTask
    );
    const setDraggedTask = useStore((store) =>
        store.setDraggedTask
    );
    return (
        <div className="task" draggable onDragStart={e => setDraggedTask(task.title)} >
            <div>{task.title}</div>
            <div className="bottomWrapper">
                <AiTwotoneDelete onClick={() => deleteTask(task.title)} />
                <div className={"status " + task.state}>{task.state}</div>
            </div>
        </div>
    );
}
