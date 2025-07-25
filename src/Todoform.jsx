function TodoForm(){

    return ( <><form>
        <label htmlFor="todo-input">New Todo:</label>
        <input type="text" id="todo-input" placeholder="Add a new todo" />
        <button type="submit">Add Todo</button>
    </form></>
       
    )
}

export default TodoForm

