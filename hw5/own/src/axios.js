import axios from 'axios'
import moment from 'moment'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })

const startGame = async () => {
  try { 
    const {
      data: { msg }
    } = await instance.post('/start')
    return msg
  } catch (err) {
    if (!err.response) {
      return 'Server not responding'
    }
  }
}

const guess = async (number) => {
  // TODO: Change this to catch error
  // The error message should be: Error: "xx" is not a valid number (1 - 100)
  try { 
    const {
      data: { msg }
    } = await instance.get('/guess', { params: { number } })
    return msg
  } catch (err) {
    if (err.response) {
      if (err.response.status === 400) 
        return number + ' is not a valid number'
    }
    return 'Server not responding'
  }
}

const restart = async () => {
  try {
    const {
      data: { msg }
    } = await instance.post('/restart')
    return msg
  } catch (err) {
    if (!err.response) {
        return 'Server not responding'
    }
  }
}

export { startGame, guess, restart }
