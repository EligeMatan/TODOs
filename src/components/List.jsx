import styles from '@/styles/scss/List.module.scss';
import Item from './Item';
import { useTasks } from './context/TasksContext';

export default function List() {
  const { tasks } = useTasks();

  return (
    <div className={styles.List}>
      {tasks.map((task, index) => (
        <Item key={index} task={task} index={index} />
      ))}
    </div>
  );
}
