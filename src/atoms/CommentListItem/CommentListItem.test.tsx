import React from 'react'
import { CommentListItem } from './CommentListItem'
import styles from './Comment.module.css'
import { render } from '@testing-library/react'

const mockDateNow = (value: number) => {
  const originalDateNow = global.Date.now;

  global.Date.now = () => value;

  return () => {
    global.Date.now = originalDateNow;
  }
}

describe('<CommentListItem>', () => {
  it('should render correctly', () => {
    const MINUTE_MS = 60000;
    const props = {
      name: 'Elon Musk',
      email: 'em@tesla.com',
      timestamp: 1,
      rating: 5,
      comment: 'Get me to the moon!'
    }
    const restoreDateNow = mockDateNow(props.timestamp + MINUTE_MS)
    const { getByTestId } = render(<CommentListItem {...props}/>)
    
    const name = getByTestId('comment-name');
    expect(name).toHaveTextContent(props.name)
    expect(name).toHaveClass(styles.item)

    const email = getByTestId('comment-email')
    expect(email).toHaveTextContent(props.email)
    expect(email).toHaveClass(styles.item)

    const rating = getByTestId('comment-rating')
    expect(rating.children).toHaveLength(props.rating)
    expect(rating).toHaveClass(styles.item)

    const timestamp = getByTestId('comment-timestamp')
    expect(timestamp).toHaveTextContent('1 minute')
    expect(timestamp).toHaveClass(styles.item)

    const text = getByTestId('comment-text')
    expect(text).toHaveTextContent(props.comment)
    expect(text).toHaveClass(styles.text)
    restoreDateNow();
  })
})