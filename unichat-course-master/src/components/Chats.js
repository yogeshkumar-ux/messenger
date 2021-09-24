import React, {useRef, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {ChatEngine} from 'react-chat-engine'
import {auth} from './firebase'
import {useAuth} from '../context/AuthContext'
import axios from 'axios';

const Chats = () => {

    const history = useHistory();
    const {user} = useAuth(); 
    const [loading, setLoading] = useState(true)

    async function handleLogout ()  {
         await auth.signOut()

        history.push("/")
    }

    async function getFile(url) {
        const response = await fetch (url);
        const data = await response.blob();
        
        return new File([data], 'test.jpg', {type:'image/jpeg'})
    }

    useEffect(()=> {
        if(!user) {
            history.push('/')

            return;
        }

    axios.get("https://api.chatengine.io/users/me/", {
        headers: {
            "project-id":  "16d20a39-6d9e-417c-82b1-49ffcf45de9b",
            "user-name" : user.email,
            "user-secret" : user.uid,
       
        }

    })

    .then(()=> {
        setLoading(false);
    })

    .catch((error)=> {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        getFile(user.photoURL)
        .then(avatar => {
               formdata.append('avatar', avatar, avatar.name)

               axios.post('https://api.chatengine.io/users/',
               formdata,
               {headers: {"private-key": process.env.REACT_APP_CHAT_ENGINE_KEY }}
               )
               .then(()=> setLoading(false))
               .catch((error)=> console.log(error, error.response))
        })


    })

    }, [user,history] )

    
    return (
        <div className = 'chats-page'>
            <div className = "nav-bar">
                <div className = "logo-tab">
                    UniChat
                </div>
                <div onClick = {handleLogout} className = 'logout-tab'> 
                Logout
                </div>
            </div>

          <ChatEngine
           height = "calc(100vh- 66px)"
           projectID = "16d20a39-6d9e-417c-82b1-49ffcf45de9b"
           userName = {user.email}
           userSecret = {user.uid}/>
        </div>
    )
}



export default Chats