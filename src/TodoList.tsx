import React, { useState } from "react";

interface item{
  id: number;
  text: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<item[]> ([
    { id: 1, text: "Indelacio limiter-off", completed: false },
    { id: 2, text: "Indelacio limiter-on", completed: false }
  ])

  const [input, setInput] = useState<string>("");

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    )
  }

  function setId(mytodo: item[]){
    const id = (mytodo.length === 0) ? 1 : mytodo[mytodo.length-1].id + 1;
    return id;
  }

  const handleClick = () => {
    const newTodo: item = {id: setId(todos), text: input, completed: false};
    setTodos([...todos, newTodo]);
  }

  return (
    <div className="main-container">
      <h1> Todo Aoi </h1>
      <ul>
        { todos.map((todo) => (
          <li key={todo.id} onClick={() => handleToggle(todo.id)} style={{textDecoration: todo.completed ? "line-through" : "none"}} >
            {todo.id}. {todo.text}
          </li>
        ))
        }
      </ul>
      <input type="text" placeholder="add todo item" onChange={(ngok) => setInput(ngok.currentTarget.value)}/>
      <button onClick={handleClick}>add</button>
    </div>
  );
}