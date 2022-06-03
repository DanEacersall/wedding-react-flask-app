import { UserContext } from '../UserContext';
import React, { useState, useEffect, useContext } from 'react';
import {BrowserRouter as Redirect} from 'react-router-dom';
import { Login } from './login';

export function Respond() {

const token = sessionStorage.getItem("token");
const json_id = sessionStorage.getItem("id");

const [going, setGoing] = useState(false)
console.log(going)

const handleGoing = () => {
    going ? setGoing(false): setGoing(true);
    
    }



const submitResponse = () => {
        console.log(token)
        const opts = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                
                "response": going,
                "id": json_id
                
            })
        }
        fetch('http://127.0.0.1:5000/verify', opts)
        .then(resp => {
            if(resp.status === 200) return resp.json();
            if(resp.status === 401) sessionStorage.removeItem("token") || <Login />
            else return ('Erroooor')

            
        })
        .then(data => {
            
            console.log(data)
            
        })
        .catch(error => {
            console.error("ERROR", error);
        })

    }
    




    return(
        <div className="App-header">
            
            {(token && token!=="" && token !==undefined) ?
                <div>
                <div>Welcome</div>
                <button onClick={handleGoing}>Going</button>
                <button onClick={submitResponse}>Submit</button>
                </div> 
                : <Login />
            
            }
            
        </div>
        
    )
}

