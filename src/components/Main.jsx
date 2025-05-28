import styles from '@/styles/scss/Main.module.scss';
import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import List from './List';
import ErrorBoundary from './ErrorBoundary';

export default function Main() {
  let today = (new Date()).toLocaleDateString();
  const [tasks, setTasks] = useState([]);
  const isInitLoading = useRef(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }

  }, []);

  useEffect(() => {
    console.log('isInitLoading', isInitLoading);
    if (isInitLoading.current) {
      isInitLoading.current = false;
      return;

    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])

  const handleKeyDown = (event) => {
    let input = event.target.value;
    const newTask = { message: input.trim(), done: false };

    if (event.key === 'Enter' && input.trim()) {
      // alert(event.target.value);
      setTasks(prev => [...prev, newTask]);
      event.target.value = '';
    }

  }

  const toggleCheck = (index) => {
    setTasks(prev => prev.map((item, ind) =>
      ind === index ? { ...item, done: !item.done } : item
    ));
  }

  const handleDelete = (index) => {
    setTasks(prev => prev.filter((_, ind) => ind !== index))
  }

  return (
    <section className={styles.Main}>
      <h1>Note you tasks</h1>
      <span className={styles.TimeSpan}>{today}</span>

      <Form.Control
        type="text"
        placeholder="Task name"
        className={styles.InputTasks}
        onKeyDown={handleKeyDown}
      />

      <List tasks={tasks} onDelete={handleDelete} onToggle={toggleCheck} />

    </section>
  )
};
