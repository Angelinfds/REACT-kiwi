import TodoList from "../features/TodoList/Todolist";   
import TodoForm from "../features/Todoform";
import TodosViewForm from "../features/TodosViewForm";



const TodosPages = ({
  addTodo,
  todoState,
  completeTodo,
  updateTodo,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
  dispatch,
  todoActions,
  styles
}) => {
  return (
    <div>
        <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />

      {todoState.isLoading ? (
        <p>Loading todos...</p>
      ) : todoState.errorMessage ? (
        <p className={styles.errorMessage}>Error: {todoState.errorMessage}</p>
      ) : todoState.todoList.length > 0 ? (
        <TodoList
          todoList={todoState.todoList}
          onCompleteTodo={completeTodo}
          onUpdateTodo={updateTodo}
          isLoading={todoState.isLoading}
        />
      ) : (
        <p>Add todo above to get started</p>
      )}

      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />

      {todoState.errorMessage && (
        <div className={styles.errorMessage}>
          <hr />
          <p>{todoState.errorMessage}</p>
          <button onClick={() => dispatch({ type: todoActions.clearError })}>Dismiss</button>
        </div>
      )}
    </div>
  )
}

export default TodosPages