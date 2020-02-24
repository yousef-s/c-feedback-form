import React from 'react'
import { InputText, InputRating, InputGroup, Button } from '../../../../atoms';
import { useField, useForm } from '../../../../hooks/form';
import { isNotEmptyString, isEmail, isBetween } from '../../../../utils/validation';
import { Comment } from '../../../../interfaces';

interface FeedbackFormProps {
  onPublish: (comment: Comment) => void
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onPublish }) => {
  const name = useField('name', {
    initialValue: '',
    validation: {
      is: isNotEmptyString,
      message: 'You must enter a name'
    }
  })
  const email = useField('email', {
    initialValue: '',
    validation: {
      is: isEmail,
      message: 'You must enter a valid email address'
    }
  })

  const rating = useField('rating', {
    initialValue: 0,
    validation: {
      is: isBetween(1, 5),
      message: null,
    }
  })

  const comment = useField('comment', {
    initialValue: '',
    validation: {
      is: isNotEmptyString,
      message: 'You must enter a comment'
    }
  })

  const { getState, isSubmittable, clear } = useForm<Comment>(name, email, rating, comment)
 
  const onSubmit = () => {
    onPublish(getState())
    clear()
  }

  return (
    <div>
      <InputGroup label="Name" errorMessage={name.message}>
        <InputText name="name" value={name.value} onChange={name.onChange} onBlur={name.showMessage} onFocus={name.hideMessage}/>
      </InputGroup>
      <InputGroup label="Email" errorMessage={email.message}>
        <InputText name="email" type="email" value={email.value} onChange={email.onChange} onBlur={email.showMessage} onFocus={email.hideMessage}/>
      </InputGroup>
      <InputGroup label="Rating" errorMessage={rating.message}>
        <InputRating name="rating" range={5} value={rating.value} onChange={rating.onChange}/>
      </InputGroup>
      <InputGroup label="Comment" errorMessage={comment.message}>
        <InputText name="comment" type="textarea" value={comment.value} onChange={comment.onChange} onBlur={comment.showMessage} onFocus={comment.hideMessage}/>
      </InputGroup>
      <Button variant="primary" disabled={!isSubmittable} onClick={onSubmit}>Publish</Button>
    </div>
  )
}