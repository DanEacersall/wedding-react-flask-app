import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState()

  useEffect(() => {
      fetch("http://127.0.0.1:5000/time/1").then(data => data.json())
      .then(data => {
        
        setData(data)
        console.log(data)
      }
      )
  }, []);

  return (
    <div>
      {data.name}
    </div>
  )
    




}



export default App