import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';
import { useRef, useState } from "react";


function TodoForm({ onAddTodo }) {
    const inputRef = useRef();
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    function handleAddTodo(event) {
        event.preventDefault();
        const title = workingTodoTitle.trim();
        onAddTodo(title); 
        if (inputRef.current) {
            inputRef.current.focus();
        }
        setWorkingTodoTitle(""); // Reset the working title state
    }
    

    return ( <>
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel ref={inputRef} value={workingTodoTitle} onChange={(e) => setWorkingTodoTitle(e.target.value)} elementId="todo-input" label="New Todo:" />
            <button disabled={!workingTodoTitle} type="submit">Add Todo</button>

         </form>
    </>
       
    )
}

export default TodoForm
