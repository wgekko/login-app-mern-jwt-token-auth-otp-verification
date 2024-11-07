import toast from 'react-hot-toast'
import { authenticate } from './helper'

/** validate login page username -  validar el login del usuario*/
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    if(values.username){
        // check user exist or not
        const { status } = await authenticate(values.username);
        
        if(status !== 200){
            errors.exist = toast.error('Usuario no existe...!')
        }
    }

    return errors;
}

/** validate password - validar la clave */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

/** validate reset password - validar el vambio de clave  */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Clave no coincide...!");
    }

    return errors;
}

/** validate register form - validar la registración  */
export async function registerValidation(values){
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}

/** validate profile page - validar la página de perfil*/
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}


/** ************************************************* */

/** validate password  - validar la clave */
function passwordVerify(errors = {}, values){
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Clave Requerida...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Clave erronea...!");
    }else if(values.password.length < 4){
        errors.password = toast.error("Clave debe tener más de 4 digitos");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Clave debe tener al menos un caracter especial");
    }

    return errors;
}


/** validate username  - validar usuario*/
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Usuario Requerido...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Usuario invalido...!')
    }

    return error;
}

/** validate email - validar correo  */
function emailVerify(error ={}, values){
    if(!values.email){
        error.email = toast.error("Email Requerido...!");
    }else if(values.email.includes(" ")){
        error.email = toast.error("Email erroneo...!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Dirección de Email invalida...!")
    }

    return error;
}