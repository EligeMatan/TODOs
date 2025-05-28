import styles from '@/styles/scss/Item.module.scss';
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useState } from 'react';

export default function Item({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.message);
  const [error, setError] = useState('');

  const startEditing = () => {
    setIsEditing(true);
    setEditedText(task.message);
    setError('');
  }

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedText(task.message);
    setError('');
  }

  const handleSave = () => {
    const trimmed = editedText.trim();
    if (!trimmed) {
      setError('Значення не може бути порожнім');
      return;
    }

    if (trimmed !== task.message) {
      onEdit(trimmed);
    }

    setIsEditing(false);
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { handleSave(); }
    else if (e.key === 'Escape') { cancelEditing(); }
  };

  // const handleEdit = () => setIsEditing(true);

  // const handleBlur = (event) => {
  //   setIsEditing(false);
  //   setEditedText(event.target.value);
  // }

  return (
    <div className={styles.Item}>
      <input type="checkbox" checked={task.done} onChange={onToggle} />

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


      <FaRegEdit onClick={handleEdit} />
      <MdOutlineDelete onClick={onDelete} />

    </div>
  )
};
