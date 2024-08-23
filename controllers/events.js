const {response} = require('express');
const Event =  require('../models/event');


const getEvent = async (req, res = response) => {

  const events = await Event.find()
    .populate('user', 'name');

  res.json({
    ok: true,
    events
  });

}

const createEvent = async (req, res =  response) => {

  const event = new Event( req.body );

  try {

    event.user = req.uid

    const saveEvent =  await event.save();

    res.json({
      ok: true,
      event: saveEvent
    });


    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
    
  }

  res.json({
    ok: true,
    msg: 'createEvent'
  });

}


const updateEvent = async (req, res = response) => {

  const idEvent = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById(idEvent);

    if(!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe con ese id'
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene permitido editar este evento'
      });

    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const updatedEvent = await Event.findByAndUpdate(idEvent, newEvent, {new: true} );

    res.json({
      ok: true,
      event: updatedEvent
    });

    
  } catch (error) {
    console.log(error)

    res.status(500).json({
      ok: true,
      msg: 'Hable con el administrador'
    });
    
  }


}

const deleteEvent = async (req, res = response) => {

  const idEvent = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById(idEvent);

    if(!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe con ese id'
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene permitido eliminar este evento'
      });

    }

    await Event.findByIdAndDelete(idEvent, {new: true} );

    res.json({ok: true})

    
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: true,
      msg: 'Hable con el administrador'
    });
    
  }

  res.json({
    ok: true,
    msg: 'deleteEvent'
  });

}

module.exports = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent

}