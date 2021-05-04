import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [NoResponse, setNoResponse] = useState(false)

  const startMenu = (
    <div>
      {NoResponse ? <p>Server Not Responding</p>:''}
      <button
        onClick={async () => {
          const msg = await startGame()
          if (msg === 'Server not responding') {
            setNoResponse(true)
          } else {
            setNoResponse(false)
            setHasStarted(true)
          }
        }}
      >
        start game
      </button>
    </div>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button
        onClick={async () => {
          const msg = await restart()
          if (msg === 'Server not responding') {
            setNoResponse(true)
          } else {
            setNoResponse(false)
            setHasWon(false)
            setStatus('')
            setNumber('')
          }
        }}
      >
        restart
      </button>
    </>
  )

  // TODO:
  // 1. use async/await to call guess(number) in Axios
  // 2. Process the response from server to set the proper state values
  const handleGuess = async () => {
      const msg = await guess(number);
      console.log(msg);
      if (msg === 'Server not responding') {
          setNoResponse(true)
          setHasStarted(false)
          setHasWon(false)
          setStatus('')
          setNumber('')
      } else if (msg === 'Equal') {
          setHasWon(true)
          setStatus('')
      } else {
          setStatus(msg);
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
      <p>{status}</p>
    </>
  )

  const game = (
    <div>
      {NoResponse ? <p>Sorry! Server is not responding.</p>:''}
      {hasWon ? winningMode : gameMode}
    </div>
  )
  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
