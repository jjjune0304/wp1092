import express from 'express'
import moment from 'moment'
import getNumber from '../core/getNumber'

const router = express.Router()

const fs = require('fs')
const path = require('path')
const t = moment(Date.now()).format('YYYY-MM-DD-HH-mm-ss')
const logPath = path.join(__dirname, '../log/') + t + '.log'

if (!fs.existsSync(path.join(__dirname, '../log'))){
  fs.mkdirSync(path.join(__dirname, '../log'));
}

fs.writeFile(logPath, "Server on\n", function(err) {
  if(err) console.log(err);
});

function log(msg) {
  fs.appendFile(logPath, 
      msg + ' ' + moment(Date.now()).format('YYYY-MM-DD-HH-mm-ss') + '\n', 
      function(err) {
        if(err) console.log(err); 
      });
}

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  const n = getNumber(true)
  log('start number = ' + n)
  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  log('guess ' + guessed)

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if (number === guessed) {
      res.send({ msg: 'Equal' })
      log('end game')
    } else if (number > guessed) {
      res.send({ msg: 'Bigger' })
    } else {
      res.send({ msg: 'Smaller' })
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  const n = getNumber(true)
  log('start number = ' + n)
  res.json({ msg: 'The game has restarted.' })
})
export default router
