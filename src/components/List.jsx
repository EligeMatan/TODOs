import styles from '@/styles/scss/List.module.scss';
import Item from './Item';
import ErrorBoundary from './ErrorBoundary';

export default function List({ tasks, onDelete, onToggle, onEdit }) {
    return (
        <div className={styles.List}>
            {tasks.map((item, index) => (
                <Item
                    key={index}
                    task={item}
                    onDelete={() => onDelete(index)}
                    onToggle={() => onToggle(index)}
                    onEdit={(newMessage) => onEdit(index, newMessage)}
                />)
            )}
        </div>
    )
};
