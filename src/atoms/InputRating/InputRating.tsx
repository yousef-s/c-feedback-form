import React from 'react'
import styles from './InputRating.module.css'

interface InputRatingProps {
  name: string;
  value: number;
  range: number;
  onChange: (value: number) => void;
}

export const InputRating: React.FC<InputRatingProps> = ({ value, name,  range, onChange }) => {

  const isSelected = (n: number) => {
    return n <= value;
  }

  const onChangeSanitize = (value: number) => {
    return () => {
      onChange(value)
    }
  }

  return (
    <div>
        {[...Array(range)].map((_, i) => {
          const value = i + 1;
          const onClick = onChangeSanitize(value)
          const selected = isSelected(value)
          return (
          // eslint-disable-next-line jsx-a11y/accessible-emoji
          <span
            data-testid={`input-rating-value-${value}`}
            role="checkbox"
            aria-checked={selected}
            aria-label={value.toString()}
            key={`input-rating-${value}`}
            className={`${styles.item} ${selected && styles.selected}`}
            onClick={onClick}
          >
          ⭐
          </span>)
        })
      }
      <input type="hidden" data-testid={`input-${name}`} value={value}/>
    </div>
  )
}

export default InputRating