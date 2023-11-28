import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const fetchTest = async () => {
    const res = await fetch('/api')
    const data = await res.json()
    setCount(data.count)
  }
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={fetchTest}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
