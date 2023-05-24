import React, { useState } from 'react';
import './App.css';
import SingleTodo from './components/SingleTodo';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [activeStatus, setActiveStatus] = useState('todo');
  const [todoList, setToDoList] = useState([
    {
      id: uuidv4(),
      name: "Go to Gym",
      status: "todo"
    }
  ]);
  const [newTaskName, setNewTaskName] = useState('');

  const changeStatus = (status) => {
    setActiveStatus(status);
  };

  const handleAddTask = () => {
    const newTask = {
      id: uuidv4(),
      name: newTaskName,
      status: 'todo',
    };

    setToDoList([...todoList, newTask]);
    setNewTaskName('');
  };

  const handleTaskStatusChange = (id, status) => {
    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, status: status === 'todo' ? 'done' : 'todo' };
      }
      return item;
    });

    setToDoList(updatedTodoList);
  };

  const handleRemoveTask = (id) => {
    const updatedTodoList = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, status: 'trash' };
      }
      return item;
    });

    setToDoList(updatedTodoList);
  };

  const filteredTodos = todoList.filter((item) => item.status === activeStatus);
  const doneTodos = todoList.filter((item) => item.status === 'done');

  return (
    <div className="App">
      <div className="tabs">
        <div className="filters">
          <h3>{activeStatus === 'todo' ? 'To Do' : 'Done'}</h3>
          <button onClick={() => changeStatus('todo')}>
            <p>To Do</p>
          </button>
          <button onClick={() => changeStatus('done')}>
            <p>Done</p>
          </button>
          <button onClick={() => changeStatus('trash')}>
            <p>Trash</p>
          </button>
        </div>
      </div>

      <div className="card-app">
        <button
          className="card-button"
          onClick={() => setIsAddModalVisible(!isAddModalVisible)}
        >
          <p className="card-text">+</p>
        </button>
      </div>

      {isAddModalVisible && (
        <div className="modal">
          <p>Add New To Do</p>
          <textarea
            className="modal-textarea"
            placeholder="Task name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <button className="modal-add-button" onClick={handleAddTask}>
            Add
          </button>
        </div>
      )}

      <div className="task-list">
        {activeStatus === 'todo' && (
          <ul>
            {filteredTodos.map((item) => (
              <SingleTodo
                key={item.id}
                item={item}
                todoList={todoList}
                setToDoList={setToDoList}
                changeStatus={handleTaskStatusChange}
                removeTask={handleRemoveTask}
              />
            ))}
          </ul>
        )}

        {activeStatus === 'done' && (
          <ul>
            {doneTodos.map((item) => (
              <SingleTodo
                key={item.id}
                item={item}
                todoList={todoList}
                setToDoList={setToDoList}
                changeStatus={handleTaskStatusChange}
                removeTask={handleRemoveTask}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
