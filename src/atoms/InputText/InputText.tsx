import React, { useCallback } from 'react'
import styles from './InputText.module.css'

export interface InputTextProps {
  name: string;
  value: string;
  type?: 'text' | 'textarea' | 'email';
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export const InputText: React.FC<InputTextProps> = ({ 
  name,
  value,
  type = 'text',
  placeholder = '',
  onChange,
  onBlur = () => void 0,
  onFocus = () => void 0
}) => {

  const onChangeSanitize = useCallback((e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }, [onChange])

  if (type === 'textarea') {
    return (<textarea data-testid={`input-${name}`} name={name} className={styles.input} value={value} placeholder={placeholder} onChange={onChangeSanitize} onBlur={onBlur} onFocus={onFocus}></textarea>)
  }

  return (
    <input data-testid={`input-${name}`} name={name} className={styles.input} value={value} placeholder={placeholder} type={type} onChange={onChangeSanitize} onBlur={onBlur} onFocus={onFocus}/>
  )
}