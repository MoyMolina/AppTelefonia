const express = require('express');
const router = express.Router();

const Proyecto = require('../models/Proyecto');

router.get('/proyectos/add', (req, res) => {
  res.render('proyectos/new-proyecto');
});

router.post('/proyectos/new-proyecto', async (req, res)=> {
  const { title, description }= req.body;
  const errors = [];
  if (!title) {
    errors.push({text:'Please write a title'});

  }
  if (!description) {
    errors.push({text:'Please Write a Description'});
  }
  if (errors.length > 0) {
    res.render('proyectos/new-proyecto', {
      errors,
      title,
      description
    });
  } else {
    const newProyecto = new Proyecto({ title, description });
    newProyecto.user = req.user.id;
    await newProyecto.save();
    req.flash('success_msg', 'Proyecto Added Successfully');
    res.redirect('/proyectos');
  }
});

router.get('/proyectos', async (req, res) => {
const proyectos = await Proyecto.find().sort({date: 'desc'});
res.render('proyectos/all-proyectos', { proyectos });
});

router.get('/proyectos/edit/:id', async (req, res) => {
  const proyecto = await Proyecto.findById(req.params.id);
  req.render('proyectos/edit-proyecto', { proyecto });
});

router.put('/proyectos/edit-proyecto/:id', async (req, res) => {
  const { title, description } = req.body;
  await Proyecto.findByIdAndUpdate(req.params.id, { title, description });
  req.flash('success_msg', 'Collection Updated Successfully');
  res.redirect('/proyectos');
});

router.delete('/proyectos/delete/:id', async (req, res) => {
  await Proyecto.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Collection Deleted Successfully');
  res.redirect('/proyectos');
});
module.exports = router;
