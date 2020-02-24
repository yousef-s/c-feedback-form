import React from 'react'
import { Button } from './Button'
import styles from './Button.module.css'
import { render, fireEvent } from '@testing-library/react'

describe('<Button>', () => {
  it('should render correctly', () => {
    const onClick = jest.fn()
    const { getByRole } = render(<Button onClick={onClick}>Click me!</Button>)
    const button = getByRole('button');

    expect(button).toHaveTextContent('Click me!')
    expect(button).not.toBeDisabled()
    expect(button).toHaveClass(styles.button, styles.primary)
  })

  it('should call the onClick handler when clicked', () => {
    const onClick = jest.fn()
    const { getByRole } = render(<Button onClick={onClick}>Click me!</Button>)
    const button = getByRole('button');

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })

  it('should not call on the onClick handler when disabled', () => {
    const onClick = jest.fn()
    const { getByRole } = render(<Button onClick={onClick} disabled={true}>Click me!</Button>)
    const button = getByRole('button');

    fireEvent.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })
})