const {NlpManager} = require('node-nlp');
const express = require('express');

const Manager = new NlpManager(({languages: ['en']}));

//express application

const app = express();

//add documentents

Manager.addDocument('en', 'hello', 'greeting');
Manager.addDocument('en', 'hi', 'greeting');
Manager.addDocument('en', 'hey there ', 'greeting');
Manager.addDocument('en', 'hey you', 'greeting');
Manager.addDocument('en', 'good morning', 'greeting');
Manager.addDocument('en', 'good afternoon', 'greeting');
Manager.addDocument('en', 'good evening', 'greeting');
Manager.addDocument('en', 'good night', 'greeting');
Manager.addDocument('en', 'good day', 'greeting');

//add answers

Manager.addAnswer('en', 'greeting', 'hi');
Manager.addAnswer('en', 'greeting', 'hey there');
Manager.addAnswer('en', 'greeting', 'hey you');
Manager.addAnswer('en', 'greeting', 'good morning');
Manager.addAnswer('en', 'greeting', 'good night');

//train model

Manager.train().then(async() =>{
  Manager.save();
  app.get('/bot', async(req, res) =>{
    let response = await Manager.process('en', req.query.message);
    res.send(response.answer || 'Sorry I in training stage.. Soon you will be better!');
  });

  app.listen(3000);
});