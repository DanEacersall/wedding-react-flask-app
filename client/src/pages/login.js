import React, { useState, useEffect } from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


export const Login = () => {
const [data, setData] = useState({})
const [code, setCode] = useState("");

useEffect(() => {
    fetch("http://127.0.0.1:5000/time/1").then(data => data.json())
      .then(data => {

        setData(data)
        console.log(data)

      }
      )
  }, []);


const handleClick = () => {

    const opts = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": data.name,
            "id": data.id
        })
    }
    fetch('http://127.0.0.1:5000/token', opts)
    .then(resp => {
        if(resp.status === 200) return resp.json();
        else alert("There has been an error")
    })
    .then()
    .catch(error => {
        console.error("ERRORRR!!!", error);
    })

}




  return (
    <div className="App-header">
        <h1>Enter Your Code</h1>
        <div>
            <input type="text" placeholder='CODE' value={code} onChange={(e) => setCode(e.target.value)} />
            <button onClick={handleClick}>Submit</button>
        </div>
      {data.name}
    </div>
  )




  }
