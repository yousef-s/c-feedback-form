import React from 'react'
import styles from './InputGroup.module.css'

interface InputGroupProps {
  label: string;
  errorMessage?: string | null;
  children: React.ReactChild
}

export const InputGroup: React.FC<InputGroupProps> = ({ label, errorMessage, children }) => {
  return (
    <div className={styles.group}>
      <label data-testid="input-group-label" htmlFor="" className={styles.label}>{label}</label>
      {children}
      {errorMessage && <span data-testid="input-group-error-message" className={styles.errorMessage}>{errorMessage}</span> }
    </div>
  )
}

export default InputGroup