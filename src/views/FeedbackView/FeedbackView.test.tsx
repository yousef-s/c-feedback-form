import React from 'react'
import { render, fireEvent, getByTestId as getByTestIdContainer } from '@testing-library/react'
import FeedbackView from './FeedbackView'

const toChangeTextEvent = (value: string) => ({ target: { value} })


describe('<FeedbackView/>', () => {
  it('should update the latest comments and graph when a new comment is added', async() => {
    const { getByTestId, getByText, getAllByTestId } = render(<FeedbackView/>)


    const elems = {
      form: {
        name: getByTestId('input-name'),
        email: getByTestId('input-email'),
        // rating: getByTestId('input-rating'),
        comment: getByTestId('input-comment'),
        button: getByText('Publish')
      },
      graph: getByTestId('graph')
    }

    const data = {
      name: 'Adam',
      email: 'adam@myspace.com',
      rating: 2,
      comment: 'foo bar',
    }

    // Update form values

    fireEvent.change(elems.form.name, toChangeTextEvent(data.name))
    fireEvent.change(elems.form.email, toChangeTextEvent(data.email))
    fireEvent.click(getByTestId(`input-rating-value-${data.rating}`))
    fireEvent.change(elems.form.comment, toChangeTextEvent(data.comment))
    // Click publish

    fireEvent.click(elems.form.button)
    // Check comment has been added
    const elem = getAllByTestId('comment')[0]
    expect(getByTestIdContainer(elem, 'comment-name')).toHaveTextContent(data.name)
    expect(getByTestIdContainer(elem, 'comment-email')).toHaveTextContent(data.email)
    expect(getByTestIdContainer(elem, 'comment-rating').children).toHaveLength(data.rating)
    expect(getByTestIdContainer(elem, 'comment-text')).toHaveTextContent(data.comment)
    // Check graph has been updated
    const graphData = JSON.parse(elems.graph.getAttribute('data-graph-data') as string)
    expect(graphData).toContainEqual(
      {rating: data.rating, count: 1}
    )
  })

})