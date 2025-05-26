import styles from '@/styles/scss/List.module.scss';
import Item from './Item';
import ErrorBoundary from './ErrorBoundary';

export default function List({ tasks, onDelete, onToggle }) {
    return (
        <div className={styles.List}>
            <ErrorBoundary>
                {tasks.map((item, index) => (
                    <Item
                        key={index}
                        task={item}
                        onDelete={() => onDelete(index)}
                        onToggle={() => onToggle(index)}
                    />)
                )}
            </ErrorBoundary>
        </div>
    )
};
