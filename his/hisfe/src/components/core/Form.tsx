import { ReactNode } from 'react';
import Card from './Card';
import styles from './Form.module.scss';
import Button from './Button';

type FormProps = {
    title?: string;
    className?: string;
    children?: ReactNode;
    haveButtons?: boolean;
    handleSubmit?: () => void;
};

export default function Form({
    title = 'Title',
    children,
    haveButtons = true,
    className,
    handleSubmit,
}: FormProps) {
    return (
        <Card className={`${styles.card} ${className}`}>
            <div className={styles.container}>
                <div className={styles.title}>{title}</div>
                {children}
                {haveButtons && (
                    <div className={styles.button_container}>
                        <Button
                            children={'Submit'}
                            className={styles.button}
                            color={'primary'}
                            size="md"
                            onClick={handleSubmit}
                        ></Button>
                        <Button
                            children={'Cancel'}
                            className={styles.button}
                            variant="outline"
                            color={'primary'}
                            size="md"
                        ></Button>
                    </div>
                )}
            </div>
        </Card>
    );
}
