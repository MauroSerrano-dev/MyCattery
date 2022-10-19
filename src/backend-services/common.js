import { getUserByEmail, getUserByUsername } from "../backend-data/users";

function generateToken(email) {
    return email
        .split('')
        .map((e, i) => String.fromCharCode(e.charCodeAt(0) + (i % 4 + 1) * 2))
        .join('')
}

function validateEmail(email) {
    // Esta expressão regular não garante que email existe, nem que é válido
    // No entanto deverá funcionar para a maior parte dos emails que seja necessário validar.
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return EMAIL_REGEX.test(email)
}

function checkPasswordStrength(password) {
    if (password.length < 8) return 0;
    const regexes = [
        /[a-z]/,
        /[A-Z]/,
        /[0-9]/,
        /[~!@#$%^&*)(+=._-]/
    ]
    return regexes
        .map(re => re.test(password))
        .reduce((score, t) => t ? score + 1 : score, 0)
}

async function checkIfEmailExists(email) {
const user = await getUserByEmail(email)
return user !== null
}
async function checkIfUserExists(username) {
const user = await getUserByUsername(username)
return user !== null
}
export {
    generateToken,
    validateEmail,
    checkPasswordStrength,
    checkIfEmailExists,
    checkIfUserExists
}