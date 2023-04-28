import React, {useEffect, useState} from 'react'
import { io } from 'socket.io-client';
import Loader from './../utils/Loader'

const socket = io('');


function Messages() {

  const [conversation, setConversation] = useState([])
  const [loading, setLoading] = useState(true)

  const {username, name, profile} = JSON.parse(localStorage.getItem('student'))

  const [text, setText] = useState({
    participants : [
      {
        username: username,
        name: name,
        profile: profile
      },
      {
        username: 'fa19bcTgp432m',
        name: 'Muhammad Ali',
        profile: 'https://via.placeholder.com/50'
      }
    ],
    sender: username,
    text: ''
  })

  const sendMessage = () => {
    socket.emit("newMessage", text)
  };

  useEffect(() => {

    socket.on('syncMessages', (data) => {
      // push the new message to the conversation
      setConversation([data])
    })

    socket.emit("getMessages", {participants : [username, 'fa19bcTgp432m']})

    return () => {
      socket.off('syncMessages')
    }

  }, [text])

  return (
        
        <section className="my-4 text-center">

          <div className="d-flex" style={{height: '87vh'}}>
            <div className="col-3 bg-light rounded-start">
              <h3 className="text-center p-3 border-bottom border-1 mb-0 border-dark">Chats</h3>
              <div className="d-flex flex-column overflow-auto" style={{height: '80vh'}}>
                {
                  conversation === null ?
                  <div className="d-flex justify-content-center align-items-center" style={{height: '60vh'}}>
                    <h2 className="text-center">No Chats</h2>
                  </div> 
                  :  
                  conversation.map((msg, index) => {
                    if(msg) {
                      return(
                        <div key={index} className="p-3 btn border-bottom " onClick={() => setText({...text, participants: msg.participants})}>
                          <div className="d-flex justify-content-between align-items-center">
                            <img src="https://via.placeholder.com/50" alt="profile" className="rounded-circle" style={{height: '50px', width: '50px'}} />
                            <div className="d-flex flex-column">
                              <h5>
                              {
                                msg.participants[0].username === username ?  msg.participants[1].name : msg.participants[0].name
                              }
                              </h5>
                              <p className='mb-0'>{msg.messages[msg.messages.length-1].text}</p>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    else{
                      return(
                        <div className="d-flex justify-content-center align-items-center" style={{height: '60vh'}}>
                          <h2 className="text-center">No Chats</h2>
                        </div>
                      ) 
                    }
                  })
                }
              </div>
            </div>
            <div className="col-9 bg-dark rounded-end">
              <div className="d-flex justify-content-center align-items-center" style={{height: '87vh'}}>
                <h2 className="text-center text-white">Select the Chat to show here</h2>
              </div>
            </div>
          </div>

          {/* <div className="form-group floating-label-form-group controls mb-0 pb-2">
            <label>Message</label>
            <textarea className="form-control" id="message" rows="5" placeholder="Message" required="required" data-validation-required-message="Please enter a message." name="text" onChange={(e) => setText({...text, text: e.target.value})}></textarea>
            <button className="btn btn-primary btn-xl" id="sendMessageButton" type="submit" onClick={sendMessage}>Send</button>
          </div>

          <hr /> */}

        </section>
  )
}

export default Messages