import styles from '@/styles/scss/Item.module.scss';
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useState } from 'react';
import { useTasks } from './context/TasksContext';

export default function Item({ task, index }) {
  const { toggleCheck, handleDelete, handleEdit } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.message);
  const [error, setError] = useState('');

  const startEditing = () => {
    setIsEditing(true);
    setEditedText(task.message);
    setError('');
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedText(task.message);
    setError('');
  };

  const handleSave = () => {
    const trimmed = editedText.trim();
    if (!trimmed) {
      setError('Значення не може бути порожнім');
      return;
    }
    if (trimmed !== task.message) {
      handleEdit(index, trimmed);
    }
    setIsEditing(false);
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    else if (e.key === 'Escape') cancelEditing();
  };

  return (
    <div className={styles.Item}>
      <input type="checkbox" checked={task.done} onChange={() => toggleCheck(index)} />

      <div className={styles.Content}>
        <span className={styles.Timestamp}>
          {new Date(task.time || Date.now()).toLocaleString()}
        </span>

        {isEditing ? (
          <>
            <input
              type="text"
              value={editedText}
              className={styles.InputEditing}
              onChange={(e) => setEditedText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            {error && <div className={styles.Error}>{error}</div>}
          </>
        ) : (
          <p className={`${styles.Text} ${task.done ? styles.TextDone : ''}`}>
            {task.message}
          </p>
        )}
      </div>

      <FaRegEdit className={styles.SignEdit} onClick={startEditing} />
      <MdOutlineDelete className={styles.SignDelete} onClick={() => handleDelete(index)} />
    </div>
  );
}
