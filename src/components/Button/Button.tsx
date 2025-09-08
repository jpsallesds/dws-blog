import type { ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: 'primary' | 'secondary';
    icon?: ReactNode;
}

const Button = ({ label, variant = 'primary', icon, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={`${styles.button} ${styles[variant]} largeSemibold`}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {label}
        </button>
    );
}

export default Button;
