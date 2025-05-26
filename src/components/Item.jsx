import styles from '@/styles/scss/Item.module.scss';
import { MdOutlineDelete } from "react-icons/md";

export default function Item({task, onDelete, onToggle}) {
  return (
    <div className={styles.Item}>
      <input type="checkbox" checked={task.done} onChange={ onToggle } />
      
      <p className={`${styles.Text} ${task.done ? styles.TextDone : ''}`}> {task.message} </p>

      <MdOutlineDelete onClick={ onDelete } />

    </div>
  )
};
