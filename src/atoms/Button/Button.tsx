import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  variant?: 'primary'
  children: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, onClick, disabled = false }) => {
  const className = `${styles.button} ${styles[variant]} ${disabled && styles.disabled}`

  return <button className={className} disabled={disabled} onClick={onClick}>{children}</button>
}