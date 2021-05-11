import express from 'express'
import getNumber from '../core/getNumber'

const router = express.Router()

var fs = require('fs');
var util = require('util');
var t = new Date();
var log_file = fs.createWriteStream(__dirname + `/log/${t.toLocaleDateString() + '-' + t.getHours() + '-' + t.getMinutes() + '-' + t.getSeconds()}.log`, {flags : 'w'});

console.log = function(d) {
  log_file.write(util.format(d) + '\n');
};

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  let number = getNumber(true)

  let now = new Date()
  console.log('start number=' + number + ' '  + now.toLocaleDateString() + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds())

  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  let now = new Date()
  console.log('guess ' + guessed + ' '  + now.toLocaleDateString() + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds())

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    console.log('A invalid number')
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if(guessed < number){
      res.json({ msg: 'Bigger' })
    }else if(guessed > number){
      res.json({ msg: 'Smaller' })
    }else{
      console.log('End Game!')
      res.json({ msg: 'Equal' })
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) =>{
  let number = getNumber(true)

  let now = new Date()
  console.log('restart number=' + number + ' '  + now.toLocaleDateString() + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds())

  res.json({ msg: 'The game has restarted.' })
})

export default router
