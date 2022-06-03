import React, { useState, useEffect, useContext } from 'react';
import { Respond } from './respond';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { UserContext } from '../UserContext';



export const Login = () => {


const [data, setData] = useState({});
const [code, setCode] = useState("");
const token = sessionStorage.getItem("token");
const json_id = sessionStorage.getItem("id");
console.log(token + "errrorrrrrrrrrrrrr")
const { verify, setVerify } = useContext(UserContext);
const id = data.id

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
            "id": id
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
            sessionStorage.setItem("id", data.json_id)
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

const redirect_response = () => {
    <Redirect to="/respond"/>
}



  return (
    <div className="App-header">
        
        {(token && token!=="" && token !==undefined) ? <Respond /> :
            <div> 
            <h1>Enter Your Code</h1>   
                <input type="text" placeholder='CODE' value={code} onChange={(e) => setCode(e.target.value)} />
                <button onClick={handleClick}>Submit</button>
            </div>
        
        }
        
        
      <div>{data.name}</div>
      
     
        
        
    </div>
  )




  }
