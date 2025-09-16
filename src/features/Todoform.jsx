import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';
import { useRef, useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  & > * {
    padding: 0.25rem; 
  }
`;

const StyledButton = styled.button`
  &:disabled {
    font-style: italic; 
  }
`;

function TodoForm({ onAddTodo, isSaving }) {
  const inputRef = useRef();
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  function handleAddTodo(event) {
    event.preventDefault();
    const title = workingTodoTitle.trim();
    onAddTodo(title);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setWorkingTodoTitle("");
  }

  return (
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        ref={inputRef}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        elementId="todo-input"
        label="New Todo:"
      />
      <StyledButton disabled={workingTodoTitle.trim() === ''} type="submit">
        {isSaving ? 'Saving...' : 'Add Todo'}
      </StyledButton>
    </StyledForm>
  );
}

export default TodoForm;
