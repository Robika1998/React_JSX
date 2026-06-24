function Select({ className = '', children, ...props }) {
  const controlClass = ['ui-select__control', className].filter(Boolean).join(' ')

  return (
    <div className="ui-select">
      <select className={controlClass} {...props}>
        {children}
      </select>
    </div>
  )
}

export default Select
