import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  const {
    data: { msg }
  } = await instance.post('/start')

  return msg
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  if (Number.isInteger(Number(number)) && number<=100 && number>0) {
    const {
      data: { msg },
    } = await instance.get('/guess', { params: { number } })
    return msg
  }
  else {
    // console.log(Number.isInteger(number) ,'Error: "xx" is not a valid number (1 - 100)')
    const msg = 'Error: "xx" is not a valid number (1 - 100)'
    return msg
  }
}

const restart = async () => {
  const {
    data: { msg }
  } = await instance.post('/restart')

  return msg
}

export { startGame, guess, restart }
