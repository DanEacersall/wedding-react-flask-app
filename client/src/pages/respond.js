import { UserContext } from '../UserContext';
import React, { useState, useEffect, useContext } from 'react';

export function Respond() {

const { verify, setVerify } = useContext(UserContext);
const [going, setGoing] = useState(verify.user_data)

const handleGoing = () => {
    going ? setGoing(false): setGoing(true);
        console.log(going)
        console.log(verify.access_token)
    }

const submitResponse = () => {

        const opts = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer" + verify.access_token
            },
            body: JSON.stringify({
                
                "response": going
                
            })
        }
        fetch('http://127.0.0.1:5000/verify', opts)
        .then(resp => {
            if(resp.status === 200) return resp.json();
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
        <div>
            <button onClick={handleGoing}>Going</button>
            <button onClick={submitResponse}>Submit</button>
            
        </div>
        
        
    )
}

