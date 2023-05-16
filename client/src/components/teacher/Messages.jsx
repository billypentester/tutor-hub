import React, {useEffect, useState} from 'react'
import Empty from '../utils/Empty';
import { io } from 'socket.io-client';

const socket = io('');


function Messages() {

    // const [messages, setMessages] = useState([])

    // const [text, setText] = useState({
    //   sender: 'fa19bcs136vyeo58',
    //   receiver: 'bilalsheikh2500op1c2p',
    //   text: ''
    // })
    
    // const sendMessage = () => {
    //   socket.emit("newMessage", text)
    // };
    
    // useEffect(() => {
    //   socket.on('syncMessages', (data) => {
    //     setMessages(data)
    //   })
    
    //   socket.emit("getMessages", {sender: 'fa19bcs136vyeo58', receiver: 'bilalsheikh2500op1c2p'})
    
    //   return () => {
    //     socket.off('syncMessages')
    //   }
    // }, [text])
    
    

    return (
        <div>

            <Empty image='https://img.icons8.com/ios/100/teacher.png' title='Messages' subtitle='No messages yet' />

            {/* <h1>Messages</h1>
        
            <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label>Message</label>
            <textarea className="form-control" id="message" rows="5" placeholder="Message" required="required" data-validation-required-message="Please enter a message." name="text" onChange={(e) => setText({...text, text: e.target.value})}></textarea>
            <button className="btn btn-primary btn-xl" id="sendMessageButton" type="submit" onClick={sendMessage}>Send</button>
            </div>

            <hr />

            <ul style={{listStyle: 'none'}}>
            { messages && messages.map((message, index) => (
                (message.sender === 'fa19bcs136vyeo58') ? (
                <li key={index} style={{color: 'red', textAlign: 'right'}}>{message.text}</li>
                ) : (
                <li key={index} style={{color: 'blue', textAlign: 'left'}}>{message.text}</li>
                )
            ))}
            </ul> */}
        
        </div>
    )


}

export default Messages