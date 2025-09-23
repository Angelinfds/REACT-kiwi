const actions = {
    //actions in useEffect that loads todos
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',
    //found in useEffect and addTodo to handle failed requests
    setLoadError: 'setLoadError',
    //actions found in addTodo
    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',
    //found in helper functions
    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',
    //reverts todos when requests fail
    revertTodo: 'revertTodo',
    //action on Dismiss Error button
    clearError: 'clearError',
};

const initialState = {
    todoList: [],
    isLoading: false,
    isSaving: false,
    errorMessage: '',
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.fetchTodos:
            return {
                ...state,
                isLoading: true,
            };
        case actions.loadTodos:
            const fetchedTodos = action.records.map((record) => {
                const todo = {
                    id: record.id,
                    ...record.fields,
                };
                if (!todo.isCompleted) {
                    todo.isCompleted = false;
                }
                return todo;
            });
            return {
                ...state,
                todoList: [...fetchedTodos],
                isLoading: false,
            };
        case actions.setLoadError:
            return {
                ...state,
                errorMessage: action.error.message,
                isLoading: false,
            };
        case actions.startRequest:
            return {
                ...state,
                isSaving: true,
            };
        case actions.addTodo:
            const savedTodo = {
                id: action.records[0].id,
                ...action.records[0].fields,
            };
            if (!action.records[0].fields.isCompleted) {
                savedTodo.isCompleted = false;
            }
            return {
                ...state,
                todoList: [...state.todoList, savedTodo],
                isSaving: false,
            };
        case actions.endRequest:
            return {
                ...state,
                isLoading: false,
                isSaving: false,
            };
        case actions.updateTodo:
            const updatedTodos = state.todoList.map((todo) => {
                if (todo.id === action.editedTodo.id) {
                    return { ...todo, title: action.editedTodo.title };
                }
                return todo;
            });
            const updatedState = { ...state, todoList: updatedTodos };
            if (action.error) {
                updatedState.errorMessage = action.error.message;
            }
            return updatedState;
        case actions.completeTodo:
            const completedTodos = state.todoList.map((todo) => {
                if (todo.id === action.id) {
                    return { ...todo, isCompleted: !todo.isCompleted };
                }
                return todo;
            });
            const filteredTodos = completedTodos.filter((todo) => !todo.isCompleted);
            return {
                ...state,
                todoList: filteredTodos,
            };
        case actions.revertTodo:
            const revertedTodos = state.todoList.map((todo) => {
                if (todo.id === action.editedTodo.id) {
                    return { ...todo, title: action.editedTodo.title };
                }
                return todo;
            });
            const revertedState = { ...state, todoList: revertedTodos };
            if (action.error) {
                revertedState.errorMessage = action.error.message;
            }
            return revertedState;
        case actions.clearError:
            return {
                ...state,
                errorMessage: '',
            };
        default:
            return state;
    }
}

export { reducer, actions, initialState };