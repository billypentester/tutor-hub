import React, {useEffect, useState} from 'react'
import { io } from 'socket.io-client';
import Loader from './../utils/Loader'

const socket = io('');

function Messages() {

  const [conversation, setConversation] = useState('')
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState('')
  const [participants, setParticipants] = useState('')
  const [update, setUpdate] = useState(false)

  const {username, name, profile} = JSON.parse(localStorage.getItem('teacher'))
  const [text, setText] = useState({text: ''})

  const sendMessage = () => {
    const message = {
      participants : [
        {
          username: username,
          name: name,
          profile: profile
        },
        {
          username: participants.username,
          name: participants.name,
          profile: participants.profile
        }
      ],
      sender: username,
      text: text.text
    }
    socket.emit("newMessage", message)
    setText({text: ''})
    setUpdate(!update)
  };

  useEffect(() => {

    socket.on('syncMessages', (data) => {
      console.log(data)
      setConversation(data)
    })

    socket.emit("getMessages", {participants : username})

    return () => {
      socket.off('syncMessages')
    }

  }, [update])

  return (
        
        <section className="my-4 text-center">

          <div className="d-flex" style={{height: '85vh'}}>
            <div className="col-3 bg-light rounded-start">
              <h3 className="text-center p-3 border-bottom border-1 mb-0 border-dark">Chats</h3>
              <div className="d-flex flex-column overflow-auto" style={{height: '80vh'}}>
                {
                  conversation === '' ?
                  <div className="d-flex justify-content-center align-items-center" style={{height: '60vh'}}>
                    <h2 className="text-center">No Chats</h2>
                  </div> 
                  :  
                  conversation.map((msg, index) => {
                    if(msg) {
                      return(
                        <div key={index} className="p-3 btn border-bottom" onClick={() => {
                          setPerson(msg.messages)
                          msg.participants[0].username === username ? setParticipants(msg.participants[1]) : setParticipants(msg.participants[0])
                        }
                        }>
                          <div className="d-flex justify-content-between align-items-center">
                            <img src={msg.participants[1].profile} alt="profile" className="rounded-circle" style={{height: '50px', width: '50px'}} />
                            <div className="d-flex flex-column">
                              <h5>
                              {
                                msg.participants[0].username === username ? msg.participants[1].name : msg.participants[0].name
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
              {
                person === '' ?
                <div className="d-flex justify-content-center align-items-center" >
                  <h2 className="text-center text-white">Select the Chat to show here</h2>
                </div>
                :
                <div className="d-flex flex-column justify-content-between">
                  <div className="d-flex flex-column overflow-auto p-3">
                    {
                      person.map((msg, index) => {
                        return(
                          <div key={index} className="d-flex flex-column">
                            {
                              msg.sender === username ?
                              <div className="d-flex justify-content-end mb-2">
                                <div className="bg-primary text-white p-2 rounded">
                                  <p className="mb-0">{msg.text}</p>
                                </div>
                              </div>
                              :
                              <div className="d-flex justify-content-start mb-2">
                                <div className="bg-light p-2 rounded">
                                  <p className="mb-0">{msg.text}</p>
                                </div>
                              </div>
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <textarea className="form-control m-3" id="message" rows="1" placeholder="Message" required="required" data-validation-required-message="Please enter a message." name="text" onChange={(e) => setText({...text, text: e.target.value})}></textarea>
                    <button className="btn btn-primary btn-xl m-3" id="sendMessageButton" type="submit" onClick={sendMessage}>Send</button>
                  </div>
                </div>
              }
            </div>
          </div>

        </section>
  )
}

export default Messages