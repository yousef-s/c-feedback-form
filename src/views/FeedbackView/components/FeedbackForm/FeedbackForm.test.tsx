import React from 'react'
import { FeedbackForm } from './FeedbackForm'
import { render, fireEvent } from '@testing-library/react'


const toChangeTextEvent = (value: string) => ({ target: { value} })

describe('<FeedbackForm>', () => {
  const onPublish = jest.fn()

  it('should render correctly (initially disabled)', () => {
    const { getByTestId, getAllByRole, getByRole, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
    const name = getByTestId('input-name')
    expect(name).toHaveValue('')

    const email = getByTestId('input-email')
    expect(email).toHaveValue('')

    const rating = getAllByRole('checkbox')
    expect(rating).toHaveLength(5)

    const comment = getByTestId('input-comment')
    expect(comment).toHaveValue('')

    const button = getByRole('button')
    expect(button).toHaveTextContent('Publish')
    expect(button).toBeDisabled()

    unmount()
  })

  describe('Field behaviour', () => {
    describe('Field: name', () => {
      const testId = 'input-name'
      const errorMessage = 'You must enter a name'
      it('should be invalid initially', () => {
        const { getByTestId, queryByText, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
        const input = getByTestId(testId)

        fireEvent.blur(input)

        expect(queryByText(errorMessage)).toBeDefined()
        unmount()
      })
      it('should not display an error message if the value is valid on blur', () => {
        const { getByTestId, queryByText, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
        const input = getByTestId(testId)

        fireEvent.change(input, toChangeTextEvent('foo'))
        fireEvent.blur(input)

        expect(queryByText(errorMessage)).toBeNull()
        unmount()
      })
      
      it('should display an error message if the value is empty on blur', () => {
        const { getByTestId, queryByText, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
        const input = getByTestId(testId)

        fireEvent.change(input, toChangeTextEvent(''))
        fireEvent.blur(input)

        expect(queryByText(errorMessage)).toBeDefined()
        unmount()
      })

      it('should hide any error message on focus', () => {
        const { getByTestId, queryByText, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
        const input = getByTestId(testId)

        fireEvent.change(input, toChangeTextEvent(''))
        fireEvent.blur(input)
        fireEvent.focus(input)

        expect(queryByText(errorMessage)).toBeNull()
        unmount()
      })
    })

    describe('Field: email', () => {
      const testId = 'input-email'
      const errorMessage = 'You must enter a valid email'
      it('should be invalid initially', () => {
        const { getByTestId, queryByText, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
        const input = getByTestId(testId)

        fireEvent.blur(input)

        expect(queryByText(errorMessage)).toBeDefined()
        unmount()
      })
      it('should not display an error message if the value is valid on blur', () => {
        const { getByTestId, queryByText, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
        const input = getByTestId(testId)

        fireEvent.change(input, toChangeTextEvent('foo@bar.com'))
        fireEvent.blur(input)

        expect(queryByText(errorMessage)).toBeNull()
        unmount()
      })
      
      it('should display an error message if the value is an invalid email on blur', () => {
        const { getByTestId, queryByText, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
        const input = getByTestId(testId)

        fireEvent.change(input, toChangeTextEvent(''))
        fireEvent.blur(input)

        expect(queryByText(errorMessage)).toBeDefined()
        unmount()
      })

      it('should hide any error message on focus', () => {
        const { getByTestId, queryByText, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
        const input = getByTestId(testId)

        fireEvent.change(input, toChangeTextEvent(''))
        fireEvent.blur(input)
        fireEvent.focus(input)

        expect(queryByText(errorMessage)).toBeNull()
        unmount()
      })
    })

    describe('Field: comment', () => {
      const testId = 'input-comment'
      const errorMessage = 'You must enter a comment'
      it('should be invalid initially', () => {
        const { getByTestId, queryByText, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
        const input = getByTestId(testId)

        fireEvent.blur(input)

        expect(queryByText(errorMessage)).toBeDefined()
        unmount()
      })
      it('should not display an error message if the value is valid on blur', () => {
        const { getByTestId, queryByText, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
        const input = getByTestId(testId)

        fireEvent.change(input, toChangeTextEvent('A great comment'))
        fireEvent.blur(input)

        expect(queryByText(errorMessage)).toBeNull()
        unmount()
      })
      
      it('should display an error message if the value is empty on blur', () => {
        const { getByTestId, queryByText, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
        const input = getByTestId(testId)

        fireEvent.change(input, toChangeTextEvent(''))
        fireEvent.blur(input)

        expect(queryByText(errorMessage)).toBeDefined()
        unmount()
      })

      it('should hide any error message on focus', () => {
        const { getByTestId, queryByText, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
        const input = getByTestId(testId)

        fireEvent.change(input, toChangeTextEvent(''))
        fireEvent.blur(input)
        fireEvent.focus(input)

        expect(queryByText(errorMessage)).toBeNull()
        unmount()
      })
    })
  })

  it('should disable the publish button whilst the form is invalid', () => {
    const { getByTestId, getByRole, unmount } = render(<FeedbackForm onPublish={onPublish}/>)
    
    // Set form into partially valid state
    fireEvent.change(getByTestId('input-name'), toChangeTextEvent('foo'))
    fireEvent.change(getByTestId('input-email'), toChangeTextEvent('foo'))

    expect(getByRole('button')).toBeDisabled()
    unmount()
  })

  it('should call the onPublish handler/clear the form with the expected value when the publish button is clicked', () => {
    const onPublish = jest.fn()
    const data = {
      name: 'Jesty',
      email: 'jesty@fb.com',
      rating: 5,
      comment: 'Hello world!'
    }
    const { getByTestId, getByRole, unmount } = render(<FeedbackForm onPublish={onPublish}/>)

    const elems = {
      name: getByTestId('input-name'),
      email: getByTestId('input-email'),
      rating: getByTestId('input-rating'),
      comment: getByTestId('input-comment'),
    }
    
    // Set values
    fireEvent.change(elems.name, toChangeTextEvent(data.name))
    fireEvent.change(elems.email, toChangeTextEvent(data.email))
    fireEvent.click(getByTestId('input-rating-value-5'))
    fireEvent.change(elems.comment, toChangeTextEvent(data.comment))

    // Click button
    fireEvent.click(getByRole('button'))

    // Assert on outcome
    expect(onPublish).toHaveBeenCalledWith(data)

    expect(elems.name).toHaveValue('')
    expect(elems.email).toHaveValue('')
    expect(elems.rating).toHaveValue('0') // HTMLInputHidden value is auto-cast to a string
    expect(elems.comment).toHaveValue('')
    unmount()
  })
})