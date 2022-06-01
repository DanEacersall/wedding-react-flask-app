import React, { useState, useEffect } from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


export const Login = () => {
const [data, setData] = useState({});
const [code, setCode] = useState("");
const token = sessionStorage.getItem("token");
const [verify, setVerify] = useState("");

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
            "password": code,
            "id": data.id
        })
    }
    fetch('http://127.0.0.1:5000/token', opts)
    .then(resp => {
        if(resp.status === 200) return resp.json();
        console.log("This came from the back end", resp)
        if(resp.status === 401) return resp.json();
        console.log("incorrect password", resp)
        
    })
    .then(data => {
        
        if(data.access_token)
        {
            sessionStorage.setItem("token", data.access_token)
            console.log(data)
            setVerify(data)

        }
            
        else if(data.response === 'incorrect password')
            setVerify(data)
            

    
        
    })
    .catch(error => {
        console.error("ERROR", error);
    })

}




  return (
    <div className="App-header">
        <h1>Enter Your Code</h1>
        {(token && token!=="" && token !==undefined) ? "You are logged in with this token" + token :
            <div>    
                <input type="text" placeholder='CODE' value={code} onChange={(e) => setCode(e.target.value)} />
                <button onClick={handleClick}>Submit</button>
            </div>
        }
      <div>{data.name}</div>
        
        <div>{verify.response}</div>
    </div>
  )




  }
