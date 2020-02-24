import React from 'react'
import { FeedbackGraph } from './FeedbackGraph'
import { render } from '@testing-library/react'
import { Comment } from '../../../../interfaces'

describe('<FeedbackGraph>', () => {
  // As recharts is a third party library which renders SVGs, it does not play nicely with JSDOM (@testing-library/react)
  // and equally asserting on it's rendered DOM nodes is both risky and testing it's implementation
  // therefore as a first iteration approach, we are rendering the same data we care about into data-* attributes
  // and asserting on them
  it('should render as expected', () => {
    const comments: Comment[] = [
      {
        name: 'John Watkins',
        email: 'john@watkins.com',
        rating: 2,
        comment: 'Some comment',
        timestamp: 0,
      },
      {
        name: 'John Watkins',
        email: 'john@watkins.com',
        rating: 2,
        comment: 'Some comment',
        timestamp: 0,
      },
      {
        name: 'John Watkins',
        email: 'john@watkins.com',
        rating: 3,
        comment: 'Some comment',
        timestamp: 0,
      }
    ]

    const expectedData = [{ rating: 1, count: 0}, { rating: 2, count: 2}, { rating: 3, count: 1}, { rating: 4, count: 0}, { rating: 5, count: 0 }]
    const { getByTestId, unmount } = render(<FeedbackGraph comments={comments}/>)
    const elem = getByTestId('graph')
    expect(elem.getAttribute('data-graph-data')).toEqual(JSON.stringify(expectedData))
    expect(elem.getAttribute('data-xaxis-label')).toEqual('Rating')
    unmount();
  })
})