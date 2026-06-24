import Button from './Button'
import Input from './Input'

function Search({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search...',
  buttonText = 'Search',
  className = '',
  inputProps = {},
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(value)
  }

  const classes = ['ui-search', className].filter(Boolean).join(' ')

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <Input
        className="ui-search__input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...inputProps}
      />
      <Button type="submit" className="ui-search__btn">
        {buttonText}
      </Button>
    </form>
  )
}

export default Search
