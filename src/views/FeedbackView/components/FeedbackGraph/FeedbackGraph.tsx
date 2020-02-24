import React, { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import styles from './FeedbackGraph.module.css'
import { Comment } from '../../../../interfaces';

interface FeedbackGraphProps {
  comments: Comment[]
}

type RatingsKeys = '1' | '2' | '3' | '4' | '5'

const toFeedbackGraphData = (comments: Comment[]) => {
  const defaultData = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0
  }

  const ratingsData = comments.reduce((o, { rating }) => {
    const key = rating.toString() as RatingsKeys
    return { ...o, [key]: o[key] + 1}
  }, defaultData)

  return Object.entries(ratingsData).map(([rating, count]) => ({rating: Number(rating), count}))
}

export const FeedbackGraph: React.FC<FeedbackGraphProps> = React.memo(({ comments })  => {
  const data = useMemo(() => toFeedbackGraphData(comments), [comments])
  const label = `Rating`
  return(
    // data-graph-data attribute used for test assertions, as we lack control over the rendered DOM elements from recharts
    <div className={styles.container} data-testid="graph" data-graph-data={JSON.stringify(data)} data-xaxis-label={label}>
      <ResponsiveContainer className={styles.constraints}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" label={{ value: label, position: 'insideBottom'}} height={60} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#009E7E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
})

