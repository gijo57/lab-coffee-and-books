'use strict';

const { Router } = require('express');
const router = new Router();
const Place = require('../models/place');
const json = require('hbs-json');
const hbs = require('hbs');

hbs.registerHelper('json', json);

router.get('/', (req, res) => {
  Place.find().then((places) => {
    res.render('index', {
      title: 'Hello World!',
      apiKey: process.env.MAPS_KEY,
      places
    });
  });
});

router.get('/create-place', (req, res) => {
  res.render('create-place', { apiKey: process.env.MAPS_KEY });
});

router.post('/create-place', (req, res, next) => {
  const { name, type, latitude, longitude } = req.body;
  Place.create({
    name,
    type,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then(() => {
      res.redirect('/create-place');
    })
    .catch((e) => next(e));
});

router.post('/delete-place', (req, res, next) => {
  const id = req.body.id;
  Place.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch((e) => next(e));
});

router.post('/edit-place', (req, res, next) => {
  const { id, name } = req.body;

  Place.findByIdAndUpdate(id, { name })
    .then(() => res.redirect('/'))
    .catch((e) => next(e));
});

router.get('/edit-place/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then((place) => res.render('edit-place', { place }))
    .catch((e) => next(e));
});

module.exports = router;
