import { useRef } from "react";

function TodoForm({ onAddTodo }) {
    const inputRef = useRef();

    function handleAddTodo(event) {
        event.preventDefault();
        const title = event.target.title.value.trim();
        onAddTodo(title); 
        event.target.title.value = ""; 
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }
    

    return ( <>
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todo-input">New Todo:</label>
            <input ref={inputRef} name="title" type="text" id="todo-input" placeholder="Add a new todo" />
            <button type="submit">Add Todo</button>
            
         </form>
    </>
       
    )
}

export default TodoForm
