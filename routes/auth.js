/*
  Rutas de Usuarios / Auth
	host + /api/auth

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/field-validates')
const router = Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { ExpressValidator } = require('express-validator');
const { validateJWT } =  require('../middlewares/validate-jwt');


router.post(
  '/new', 
  [ //middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 }),
    fieldsValidate



  ],
  createUser );

router.post(
  '/',
  [
    //middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check ('password', 'el password es obligatorio').isLength({ min: 6 }),
    fieldsValidate

  ],
  loginUser);

router.get('/renew', validateJWT ,revalidateToken);






module.exports = router;