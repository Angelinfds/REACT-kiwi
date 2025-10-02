import TodoList from "../features/TodoList/Todolist";
import TodoForm from "../features/Todoform";
import TodosViewForm from "../features/TodosViewForm";
import { useSearchParams, useNavigate } from "react-router";
import { useEffect } from "react";



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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Filter todos based on query string if it exists
  const filteredTodoList = queryString
    ? todoState.todoList.filter(todo =>
        todo.title.toLowerCase().includes(queryString.toLowerCase())
      )
    : todoState.todoList;

  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

  // Get current page todos
  const currentTodos = filteredTodoList.slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage);

  // Navigation handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: (currentPage - 1).toString() });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: (currentPage + 1).toString() });
    }
  };

  // Protect against invalid URL parameters
  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate("/");
      }
    }
  }, [currentPage, totalPages, navigate]);
  return (
    <div>
        <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />

      {todoState.isLoading ? (
        <p>Loading todos...</p>
      ) : todoState.errorMessage ? (
        <p className={styles.errorMessage}>Error: {todoState.errorMessage}</p>
      ) : filteredTodoList.length > 0 ? (
        <>
          <TodoList
            todoList={currentTodos}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updateTodo}
            isLoading={todoState.isLoading}
          />
          {totalPages > 1 && (
            <div className="paginationControls" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              margin: '1rem 0',
              padding: '1rem'
            }}>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: currentPage === 1 ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Previous
              </button>
              <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: currentPage === totalPages ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
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