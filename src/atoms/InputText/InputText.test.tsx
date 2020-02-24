import React from 'react'
import { InputText, InputTextProps } from './InputText'
import styles from './InputText.module.css'
import { render, fireEvent } from '@testing-library/react'

describe('<InputText>', () => {
  it('should render correctly', () => {
    const props: InputTextProps = {
      name: 'field',
      value: '',
      onChange: jest.fn(),
      placeholder: 'placeholder',
    }
    const { getByTestId } = render(
      <InputText {...props}/>
    )

    const input = getByTestId('input-field')

    expect(input).toBeInstanceOf(HTMLInputElement)
    expect(input).toHaveClass(styles.input)
    expect(input).toHaveValue(props.value)
    expect(input).toHaveAttribute('placeholder', props.placeholder)
  })
  
  it('should render a <textarea> if the prop type is textarea', () => {
    const props: InputTextProps = {
      name: 'field',
      value: '',
      onChange: jest.fn(),
      placeholder: 'placeholder',
      type: 'textarea'
    }
    const { getByTestId } = render(
      <InputText {...props}/>
    )

    const input = getByTestId('input-field')
    
    expect(input).toBeInstanceOf(HTMLTextAreaElement)
    expect(input).toHaveClass(styles.input)
    expect(input).toHaveValue(props.value)
    expect(input).toHaveAttribute('placeholder', props.placeholder)
  })

  it('should call the onChange handler with a sanitized value (string) when the value changes', () => {
    const onChange = jest.fn()
    const props: InputTextProps = {
      name: 'field',
      value: '',
      onChange,
    }
    const { getByTestId } = render(
      <InputText {...props}/>
    )

    const input = getByTestId('input-field')
    const value = 'foo bar'
    fireEvent.change(input, { target: { value }})
    
    expect(onChange).toHaveBeenCalledWith(value)
  })

  it('should call the onBlur handler when the input is blurred', () => {
    const onBlur = jest.fn()
    const props: InputTextProps = {
      name: 'field',
      value: '',
      onChange: jest.fn(),
      onBlur
    }
    const { getByTestId } = render(
      <InputText {...props}/>
    )

    const input = getByTestId('input-field')
    fireEvent.blur(input)
    
    expect(onBlur).toHaveBeenCalled()
  })

  it('should call the onFocus handler when the input is focused', () => {
    const onFocus = jest.fn()
    const props: InputTextProps = {
      name: 'field',
      value: '',
      onChange: jest.fn(),
      onFocus
    }
    const { getByTestId } = render(
      <InputText {...props}/>
    )

    const input = getByTestId('input-field')
    fireEvent.focus(input)
    
    expect(onFocus).toHaveBeenCalled()
  })

 
})