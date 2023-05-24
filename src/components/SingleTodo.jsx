export default function SingleTodo({ item, todoList, setToDoList, changeStatus, removeTask }) {
    const changeStatusToTrash = (id) => {
      const itemToTrash = todoList.find((item) => item.id === id);
      itemToTrash.status = 'trash';
      const newToDoListWithoutItem = todoList.filter((item) => item.id !== id);
      setToDoList(newToDoListWithoutItem);
    };
  
    const handleCheckboxChange = () => {
      const newStatus = item.status === 'todo' ? 'done' : 'todo';
      changeStatus(item.id, newStatus);
    };
  
    return (
      <div>
        <input type="checkbox" checked={item.status === 'done'} onChange={handleCheckboxChange} />
        <span>{item.name}</span>
        <button className="trash-button" onClick={() => changeStatusToTrash(item.id)}>
          Move to Trash
        </button>
      </div>
    );
  }
  