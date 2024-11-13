import style from './StatusMessage.module.scss'

export type SubmissionStatus = 'success' | 'error' | null

interface StatusMessageProps {
  status: SubmissionStatus
}

export const StatusMessage = ({ status }: StatusMessageProps) => {
  if (!status) return null

  return (
    <p className={`${style.statusMessage} ${style[status]}`}>
      {status === 'success'
        ? 'Order completed successfully!'
        : 'There was an error processing your order. Please try again.'}
    </p>
  )
}

export default StatusMessage
