const form = document.getElementById('form')
const fisrtsname_input = document.getElementById('firstname_input')
const email_input = document.getElementById('email_input')
const password_input = document.getElementById('password_input')
const repeatpassword_input = document.getElementById('repeat-password_input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let errors = []

    if(fisrtsname_input){
        errors = getSignupFormErrors(fisrtsname_input.value, email_input.value, password_input.value, repeatpassword_input.value)
    }else{
        errors = getLoginFormErrors(email_input.value, password_input.value)
    }
    if  (errors.length > 0){
        e.preventDefault()
        error_message.innerText = errors.join(". ")
    }
})

// valida los errores a la hora de registrarse
function getSignupFormErrors(firstname,email,password,repeatPassword){
    let errors = []
    if (firstname === '' || firstname == null){
        errors.push('Firstname is required')
        fisrtsname_input.parentElement.classList.add('incorrect')
    }
    if (email === '' || email == null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if (password === '' || password == null){
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }
    if (repeatPassword !== password){
        errors.push("Password does'nt match")
        password_input.parentElement.classList.add('incorrect')
        repeatpassword_input.parentElement.classList.add('incorrect')
    }
    return errors;
}

// Valida los errores a la hora de iniciar sesión
function getLoginFormErrors(email, password){
    let errors = []

    if (email === '' || email == null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if (password === '' || password == null){
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }

    return errors;
}


const allInputs = [fisrtsname_input, email_input, password_input, repeatpassword_input].filter(input => input != null)

allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            error_message.innerText = ''
        }
    })
})