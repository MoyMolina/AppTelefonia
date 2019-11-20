const express = require('express');
const router = express.Router();

const Collection = require('../models/Collection');
const { isAuthenticated } = require('../helpers/auth');

router.get('/collections/add', isAuthenticated, (req, res) => {
  res.render('collections/new-collection');
});

router.post('/collections/new-collection', isAuthenticated, async (req, res)=> {
  const { title, description }= req.body;
  const errors = [];
  if (!title) {
    errors.push({text:'Please write a title'});

  }
  if (!description) {
    errors.push({text:'Please Write a Description'});
  }
  if (errors.length > 0) {
    res.render('collections/new-collection', {
      errors,
      title,
      description
    });
  } else {
    const newCollection = new Collection({ title, description });
    newCollection.user = req.user.id;
    await newCollection.save();
    req.flash('success_msg', 'Collection Added Successfully');
    res.redirect('/collections');

  }
});

router.get('/collections', isAuthenticated, async (req, res) => {
const collections = await Collection.find({user: req.user.id}).sort({date: 'desc'});
res.render('collections/all-collections', { collections });
});

router.get('/collections/edit/:id', isAuthenticated, async (req, res) => {
  const collection = await Collection.findById(req.params.id);
  res.render('collections/edit-collection', {collection});
});

router.put('/collections/edit-collection/:id', isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Collection.findByIdAndUpdate(req.params.id, { title, description });
  req.flash('success_msg', 'Collection Updated Successfully');
  res.redirect('/collections');
});

router.delete('/collections/delete/:id', isAuthenticated, async (req, res) => {
  await Collection.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Collection Deleted Successfully');
  res.redirect('/collections');
});
module.exports = router;
