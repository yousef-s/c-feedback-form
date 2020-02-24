import React, { useState } from 'react'
import { Comment } from '../../interfaces'
import { FeedbackForm, FeedbackGraph } from './components/'
import styles from './FeedbackView.module.css'
import { CommentListItem } from '../../atoms'
import stub from '../../stubs/comments.json'

export const FeedbackView = () => {
  const [comments, setComments] = useState<Comment[]>(process.env.REACT_APP_USE_MOCK_DATA ? stub : [])

  const handlePublishComment = (comment: Comment) => {
    setComments([
      { ...comment, timestamp: Date.now() },
      ...comments
    ])
  }

  return(
    <div className={styles.container}>
      <div className={styles.comments}>
      <h3>Add new comment</h3>
      <FeedbackForm onPublish={handlePublishComment}/>
      <h3>Latest comments</h3>
      {
        comments.map((props, i) => <CommentListItem key={`comment-${i}`} {...props}/>)  
      }
      </div>
      <FeedbackGraph comments={comments}/>
    </div>
  )
}

export default FeedbackView;