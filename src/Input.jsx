import { useFormContext } from 'react-hook-form'
// import { AnimatePresence, motion } from 'framer-motion'
// import { MdError } from 'react-icons/md'

export function findInputError(errors, name) {
    const filtered = Object.keys(errors)
      .filter(key => key.includes(name))
      .reduce((cur, key) => {
        return Object.assign(cur, { error: errors[key] })
      }, {})
    return filtered
  }

  export const isFormInvalid = err => {
    if (Object.keys(err).length > 0) return true
    return false
  }

export const Input = ({
  name,
  label,
  type,
  id,
  placeholder,
  validation,
  multiline,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const inputErrors = findInputError(errors, name)
  const isInvalid = isFormInvalid(inputErrors)

  return (
    <div>
      <div>
        <label htmlFor={id}>
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputErrors.error.message}
              key={inputErrors.error.message}
            />
          )}
        </AnimatePresence>
      </div>
      {multiline ? (
        <textarea
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
      )}
    </div>
  )
}

const InputError = ({ message }) => {
  return (
    <motion.p
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  )
}

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
}