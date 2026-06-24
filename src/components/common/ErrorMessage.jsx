import Button from '../ui/Button'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <div className="error-message__icon">!</div>
      <h3 className="error-message__title">Something went wrong</h3>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <Button onClick={onRetry}>Try Again</Button>
      )}
    </div>
  )
}

export default ErrorMessage
