import React from 'react'

const TodosViewForm = () => {
  return (
    <form>
        <div>
            <label htmlFor='time'>Sort by</label>
            <select id="time">
                <option value="title">Title</option>
                <option value="createdTime" selected>Time added</option>
            </select>
            
            <label>Direction</label>
            <select>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            
        </div>
    </form>
  )
}

export default TodosViewForm