function Loader({ message = 'Loading...' }) {
  return (
    <div className="loader">
      <div className="loader__spinner" />
      <p className="loader__text">{message}</p>
    </div>
  )
}

export default Loader
