import { Router } from "express";
const router = Router();

/** import all controllers  - importar todos los controladores*/
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js'
import Auth, { localVariables } from '../middleware/auth.js';



/** POST Methods  - metodos post*/
router.route('/register').post(controller.register); // register user -registrar usuario
router.route('/registerMail').post(registerMail); // send the email - enviar correo electronico
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end()); // authenticate user - autentificar usuario
router.route('/login').post(controller.verifyUser,controller.login); // login in app - inicio de app

/** GET Methods - metodos get*/
router.route('/user/:username').get(controller.getUser) // user with username - usuario con sobrenombre
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP) // generate random OTP - generar de forma aleatoria de OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP) // verify generated OTP - verificación de OTP generado
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables - reasignar todas las variables


/** PUT Methods - metodos put*/
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile - se usa para actualizar el perfil del usuario
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); // use to reset password - se usa para reasignar la nueva clave



export default router;