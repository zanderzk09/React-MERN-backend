/* 
  Event routes
  /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validateJWT } = require('../middlewares/validate-jwt');
const { fieldsValidate } =require('../middlewares/field-validates');
const {getEvent, createEvent, updateEvent, deleteEvent} = require('../controllers/events')


const router = Router();

//Deben de pasar por la validación del JWT
router.use(validateJWT);


//obtener eventos

router.get('/', getEvent);

router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate),


    fieldsValidate
  ], 
  createEvent
);

router.put('/:id', updateEvent); 

router.delete('/:id', deleteEvent);


module.exports = router;






