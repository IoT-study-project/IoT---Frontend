export const username_validation = {
    name: 'username',
    label: 'username',
    type: 'text',
    id: 'username',
    placeholder: 'Type your username ...',
    validation: {
        required: {
            value: true,
            message: 'required',
        },
        minLength: {
            value: 6,
            message: 'min 6 characters',
        },
        maxLength: {
            value: 16,
            message: '16 characters max',
        },
        pattern: {
            value: /^[0-9A-Za-z]{6,16}$/,
            message: 'only letters and numbers',
        },
    },
}

export const password_validation = {
    name: 'password',
    label: 'password',
    type: 'password',
    id: 'password',
    placeholder: 'Type your password ...',
    validation: {
        required: {
            value: true,
            message: 'required',
        },
        minLength: {
            value: 8,
            message: 'min 8 characters',
        },
        maxLength: {
            value: 32,
            message: '32 characters max',
        },
        pattern: {
            value: /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/,
            message: 'min 1 uppercase letter, min 1 lowercase letter, min 1 number, min 1 special character',
        },

    },
}

export const isFormInvalid = err => {
    if (Object.keys(err).length > 0) return true
    return false
}

export function findInputError(errors, name) {
    const filtered = Object.keys(errors)
        .filter(key => key.includes(name))
        .reduce((cur, key) => {
            return Object.assign(cur, { error: errors[key] })
        }, {})
    return filtered
}