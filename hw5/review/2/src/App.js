import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [serverStatus, setServerStatus] = useState(true)

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          let x = await startGame()
          if(x === 'Network Error') {
            setHasStarted(false)
            setServerStatus(false)
          } else {
            setHasStarted(true)
            setServerStatus(true)
          }
        }}
      >
        start game
      </button>
      {serverStatus ? <p></p> : <p>Server Error!!</p>}
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          let x = await restart()
          if(x === 'Network Error') {
            setServerStatus(false)
          } else {
            setServerStatus(true)
            setHasWon(false)
            setStatus('')
            setNumber('')
          }
        }}
      >
        restart
      </button>
      {serverStatus ? <p></p> : <p>Server Error!!</p>}
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async  () => {
    let x = await guess(number)
    if(x === 'Request failed with status code 400') {
      setStatus('not a valid number! try (1 - 100)')
      setServerStatus(true)
    } else if(x === 'Network Error'){
      setServerStatus(false)
    }else {
      setStatus(x)
      setServerStatus(true)
      if(x === 'Equal') setHasWon(true)
    }
  }

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button
        onClick={handleGuess}
        disabled={!number}
      >
        guess!
      </button>
      {serverStatus ? <p>{status}</p> : <p>Server Error!!</p>}
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
