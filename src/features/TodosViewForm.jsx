import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 0.25rem 0.5rem;
`;

const StyledSelect = styled.select`
  padding: 0.25rem 0.5rem;
`;

const StyledButton = styled.button`
  padding: 0.25rem 0.5rem;
  &:disabled {
    font-style: italic;
  }
`;

const TodosViewForm = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) => {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);

  function preventRefresh(event) {
    event.preventDefault();
  }

  return (
    <StyledForm onSubmit={preventRefresh}>
      <StyledGroup>
        <StyledLabel>Search Todos</StyledLabel>
        <StyledInput
          type="text"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <StyledButton type="button" onClick={() => setLocalQueryString("")}>
          Clear
        </StyledButton>
      </StyledGroup>

      <StyledGroup>
        <StyledLabel htmlFor="time">Sort by</StyledLabel>
        <StyledSelect
          id="time"
          onChange={(e) => setSortField(e.target.value)}
          value={sortField}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </StyledSelect>

        <StyledLabel htmlFor="direction">Direction</StyledLabel>
        <StyledSelect
          id="direction"
          onChange={(e) => setSortDirection(e.target.value)}
          value={sortDirection}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </StyledSelect>
      </StyledGroup>
    </StyledForm>
  );
};

export default TodosViewForm;
