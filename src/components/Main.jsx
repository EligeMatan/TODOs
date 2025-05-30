import styles from '@/styles/scss/Main.module.scss';
import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import List from './List';
import { TasksContext } from './context/TasksContext';

export default function Main() {
  const today = new Date().toLocaleDateString();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const isInitLoading = useRef(true);

  useEffect(() => {
    if (isInitLoading.current) {
      isInitLoading.current = false;
      return;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (message) => {
    const newTask = {
      message,
      done: false,
      time: Date.now(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleCheck = (index) => {
    setTasks(prev => prev.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    ));
  };

  const handleDelete = (index) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index, newMessage) => {
    setTasks(prev => prev.map((item, i) =>
      i === index ? { ...item, message: newMessage } : item
    ));
  };

  const handleKeyDown = (event) => {
    const input = event.target.value.trim();
    if (event.key === 'Enter' && input) {
      addTask(input);
      event.target.value = '';
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, toggleCheck, handleDelete, handleEdit }}>
      <section className={styles.Main}>
        <h1>Note your tasks</h1>
        <span className={styles.TimeSpan}>{today}</span>

        <Form.Control
          type="text"
          placeholder="Input your task and press Enter"
          className={styles.InputTasks}
          onKeyDown={handleKeyDown}
        />

        <List />
      </section>
    </TasksContext.Provider>
  );
}
