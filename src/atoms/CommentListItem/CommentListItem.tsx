import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Comment } from '../../interfaces'
import styles from './CommentListItem.module.css'

type CommentProps = Comment

export const CommentListItem: React.FC<CommentProps> = ({ name, email, rating, timestamp, comment }) => {
  return (
    <div className={styles.container} data-testid="comment">
      <div className={styles.metadata}>
        <span data-testid="comment-name" className={styles.item}>{name}</span>
        <span data-testid="comment-email" className={styles.item}>{email}</span>
        <span data-testid="comment-rating" className={styles.item}>{[...Array(rating)].map((_, i) => <span className={styles.rating} role="img" aria-label={`${i} stars`}key={`rating-${i}`}>⭐</span>)}</span>
        <span data-testid="comment-timestamp"className={styles.item}>{timestamp && formatDistanceToNow(timestamp)}</span>
      </div>
      <div data-testid="comment-text" className={styles.text}>{comment}</div>
    </div>
  )
}