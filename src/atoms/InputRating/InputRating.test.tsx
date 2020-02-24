import React from 'react'
import { InputRating } from './InputRating'
import styles from './InputRating.module.css'
import { render, fireEvent } from '@testing-library/react'

describe('<InputRating>', () => {
  it('should render correctly', () => {
    const onChange = jest.fn()
    const { getAllByRole } = render(
      <InputRating name="field" range={5} value={3} onChange={onChange}/>
    )

    const elems = getAllByRole('checkbox')
    expect(elems).toHaveLength(5)

    const selected = elems.filter(elem => elem.className.includes(styles.selected))
    expect(selected).toHaveLength(3)
  })

  it('should call the onChange handler when clicked with the correct value based on the star number', () => {
    const onChange = jest.fn()
    const { getByTestId } = render(
      <InputRating name="field" range={5} value={3} onChange={onChange}/>
    )

    fireEvent.click(getByTestId('input-rating-value-2'))

    expect(onChange).toHaveBeenCalledWith(2)
  })
})