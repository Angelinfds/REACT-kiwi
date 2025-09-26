
import "./App.css";
import { useState, useEffect, useCallback, useReducer, use } from "react";
import styles from "./app.module.css";
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';
import TodosPages from "./pages/TodosPages";
import HeaderComponent from "./shared/HeaderComponent";
import { useLocation, Routes, Route } from "react-router"; 

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;



function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("asc");
  const [queryString, setQueryString] = useState("");
  const [title, setTitle] = useState();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("My Todo App");
    } else if (location.pathname === "/about") {
      setTitle("About This App");
    } else {
      setTitle("Page Not Found");
    }
    
  }, [location]);
  

  const encodeUrl = useCallback(({ sortField, sortDirection, queryString }) => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = queryString
      ? `&filterByFormula=SEARCH("${queryString}", {title})`
      : "";
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, []);

  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options = {
        method: "GET",
        headers: {
          Authorization: token,
        },
      };

      try {
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection, queryString }),
          options
        );
        if (!resp.ok) {
          throw new Error(resp.message);
        }

        const { records } = await resp.json();
        dispatch({ type: todoActions.loadTodos, records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      }
    };
    fetchTodos();
  }, [sortField, sortDirection, queryString]);

  // Function to handle adding a new todo

  const addTodo = async (title) => {
    const payload = {
      records: [
        {
          fields: {
            title: title,
            isCompleted: false,
          },
        },
      ],
    };
    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }

      const { records } = await resp.json();
      dispatch({ type: todoActions.addTodo, records });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === id);

    // Optimistic update - update UI immediately
    dispatch({ type: todoActions.completeTodo, id });

    const payload = {
      records: [
        {
          id: id,
          fields: {
            title: originalTodo.title,
            isCompleted: !originalTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      const revertError = { message: `${error.message}. Reverting todo...` };
      // Revert the optimistic update
      dispatch({ type: todoActions.revertTodo, editedTodo: originalTodo, error: revertError });
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === editedTodo.id);

    // Optimistic update - update UI immediately
    dispatch({ type: todoActions.updateTodo, editedTodo });

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }
    } catch (error) {
      const revertError = { message: `${error.message}. Reverting todo...` };
      // Revert the optimistic update
      dispatch({ type: todoActions.revertTodo, editedTodo: originalTodo, error: revertError });
    }
  };

  return (
    <div className={styles.center}>
      <HeaderComponent title={title} />
      <Routes>
        <Route path="/" element={<TodosPages
          addTodo={addTodo}
          todoState={todoState}
          completeTodo={completeTodo}
          updateTodo={updateTodo}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          sortField={sortField}
          setSortField={setSortField}
          queryString={queryString}
          setQueryString={setQueryString}
          dispatch={dispatch}
          todoActions={todoActions}
          styles={styles}
        />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
