import React from "react";

const TodosViewForm = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString
}) => {
  function preventRefresh(event) {
    event.preventDefault();
  }
  return (
    <form onSubmit={preventRefresh}>
        <div>
        <label>Search Todos</label>
        <input
          type="text"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />

        <button type="button" onClick={() => setQueryString("")}>
          Clear
        </button>
        </div>

      <div>
        <label htmlFor="time">Sort by</label>
        <select
          id="time"
          onChange={(e) => setSortField(e.target.value)}
          value={sortField}
        >
          <option value="title">Title</option>
          <option value="createdTime">
            Time added
          </option>
        </select>

        <label htmlFor="direction">Direction</label>
        <select
          id="direction"
          onChange={(e) => setSortDirection(e.target.value)}
          value={sortDirection}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
};

export default TodosViewForm;
