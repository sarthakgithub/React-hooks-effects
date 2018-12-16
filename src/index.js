import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Form from "./form.jsx";
import "./styles.css";

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
    const [item] = data.results;
    setData(item);
    setLoading(false);
  }, []);
  return { data, loading };
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const { data, loading } = useFetch("https://api.randomuser.me");
  const toggleComplete = i => () => {
    setTodos(
      todos.map((todo, index) => {
        if (i === index) {
          return {
            ...todo,
            completed: !todo.completed
          };
        } else {
          return todo;
        }
      })
    );
  };

  const reset = () => {
    setTodos([]);
  };

  return (
    <div>
      <Form
        onSubmit={text => setTodos([{ text, completed: false }, ...todos])}
      />
      <div>
        {todos.map(({ text, completed }, i) => {
          return (
            <div
              onClick={toggleComplete(i)}
              style={{ textDecoration: completed ? "line-through" : "none" }}
            >
              {text}
            </div>
          );
        })}
      </div>
      <button onClick={reset}>Reset</button>
      {loading ? <div>...loading</div> : <div>{data.name.first}</div>}
    </div>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
