import React, {useState} from 'react'
import Display from './components/Display'
import Btn from './components/Btn'
import './App.css'

const App = () => {
  const [time, setTime] = useState({
      ms:0,
      s:0, 
      m:0, 
      h:0
    })
  const [interv, setInterv] = useState()
  const [status, setStatus] = useState(0)
  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    run()
    setStatus(1)
    setInterv(setInterval(run, 10))
  }

  let mostRecentMs = time.ms, mostRecentS = time.s, mostRecentM = time.m, mostRecentH = time.h

  const run = () => {
    if(mostRecentM === 60){
      mostRecentH++
      mostRecentM = 0
    }
    if(mostRecentS === 60){
      mostRecentM++
      mostRecentS = 0
    }
    if(mostRecentMs === 100){
      mostRecentS++
      mostRecentMs = 0
    }
    mostRecentMs++
    return setTime({ms:mostRecentMs, s:mostRecentS, m:mostRecentM, h:mostRecentH})
  }

  const stop = () => {
    clearInterval(interv)
    setStatus(2)
  }

  const reset = () => {
    clearInterval(interv)
    setStatus(0)
    setTime({ms:0, s:0, m:0, h:0})
  }

  const resume = () => start()


  return (
    <div className="container">
     <div className="clock">
          <div className="stopwatch">
               <Display time={time}/>
               <Btn status={status} resume={resume} reset={reset} stop={stop} start={start}/>
          </div>
     </div>
    </div>
  )
}

export default App