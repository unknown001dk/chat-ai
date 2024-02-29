const {NlpManager} = require('node-nlp');
const express = require('express');

const Manager = new NlpManager(({languages: ['en']}));

//express application

const app = express();

//add documentents

//      ===========================================================

// Manager.addDocument('en', 'hello', 'greeting');

// //add answers

// Manager.addAnswer('en', 'greeting', 'hi');
// Manager.addAnswer('en', 'intent', 'hello');

// Manager.addAnswer('en', 'byemessages', 'we will talk later');
//      ===========================================================

// read answers in json format

const fs = require("fs");
const files = fs.readdirSync("./data");

for(const file of files){
  let data = fs.readFileSync(`./data/${file}`);
  data = JSON.parse(data);
  const intent = file.replace(".json", "");
  for(const question of data.questions) {
    Manager.addDocument('en', question, intent);
  }
  for(const answer of data.answers) {
    Manager.addAnswer('en', intent, answer);
  }
}

//train model

Manager.train().then(async() =>{
  Manager.save();
  app.get('/bot', async(req, res) =>{
    let response = await Manager.process('en', req.query.message);
    res.send(response.answer || "Sorry, I am training assistant i will train.");
    console.log(response.answer);
  });
  app.listen(3801);
});