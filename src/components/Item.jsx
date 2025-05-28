import styles from '@/styles/scss/Item.module.scss';
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useState } from 'react';

export default function Item({ task, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.message);

  const handleEdit = () => setIsEditing(true);

  return (
    <div className={styles.Item}>
      <input type="checkbox" checked={task.done} onChange={onToggle} />

      {isEditing ? (
        <input type='text'
          value={editedText}
          onChange={(event) => setEditedText(event.target.value)}
          onBlur={null}
        />
      ) : (
        <p className={`${styles.Text} ${task.done ? styles.TextDone : ''}`}>{(new Date()).toLocaleString()} {task.message} </p>
      )}

      <FaRegEdit onClick={handleEdit} />
      <MdOutlineDelete onClick={onDelete} />

    </div>
  )
};
