import React from 'react'
import { InputGroup } from './InputGroup'
import styles from './InputGroup.module.css'
import { render } from '@testing-library/react'

describe('<InputGroup>', () => {
  it('should render correctly', () => {
    const { getByTestId, queryByTestId } = render(
      <InputGroup label="Field">
        <input data-testid="child" type="text"/>
      </InputGroup>
    )
    
    const label = getByTestId('input-group-label')
    expect(label).toHaveTextContent('Field')
    expect(label).toHaveClass(styles.label)
    
    const child = getByTestId('child')
    expect(child).toBeDefined()

    const errorMessage = queryByTestId('input-group-error-message')
    expect(errorMessage).toBeNull()
  })

  it('should show the error message if it is not a falsy value', () => {
    const { getByTestId } = render(
      <InputGroup label="Field" errorMessage="This is wrong">
        <input data-testid="child" type="text"/>
      </InputGroup>
    )

    const errorMessage = getByTestId('input-group-error-message')
    expect(errorMessage).toHaveTextContent('This is wrong')
    expect(errorMessage).toHaveClass(styles.errorMessage)
  })
})