import React, {useEffect, useState} from 'react'
import { io } from 'socket.io-client';
import Loader from './../utils/Loader'
import Empty from './../utils/Empty'

const socket = io('');

function Messages() {

  const [conversation, setConversation] = useState('')
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState('')
  const [participants, setParticipants] = useState('')

  const {username, name, profile} = JSON.parse(localStorage.getItem('student'))
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
    setPerson(prevPerson => ({...prevPerson, messages: [...prevPerson.messages, message]}));
    socket.emit("newMessage", message)
    setText({ text: '' });
  };

  useEffect(() => {
    socket.emit("getMessages", {participants : username})
    socket.on('receiveMessages', (data) => {
      setConversation(data)
      setLoading(false)
    })
    return () => {
      socket.off('receiveMessages')
    }
  }, [])

  useEffect(() => {

    socket.on('syncMessages', (data) => {
      setConversation(prevConversation => {
        const updatedConversation = prevConversation.map(msg => {
          if (msg._id === data._id) {
            return data;
          }
          return msg;
        });
        return updatedConversation;
      });
      setPerson((prevPerson) => {
        if (prevPerson._id === data._id) {
          return data;
        }
        return prevPerson;
      });
    });

    return () => {
      socket.off('syncMessages')
    }

  }, [])

  return (
    <>
      {
        conversation && conversation.length === 0 ?
        <Empty image='https://img.icons8.com/ios/100/000000/nothing-found.png' title='No Chats' subtitle={`You don't have any chats`} />
        :
        <section className="text-center">
          <div className="d-flex align-items-center justify-content-center" style={{height: '91vh'}}>

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
                          setPerson(msg)
                          msg.participants[0].username === username ? setParticipants(msg.participants[1]) : setParticipants(msg.participants[0])
                        }
                        }>
                          <div className="d-flex justify-content-between align-items-center">
                            <img src={msg.participants[1].profile} alt="profile" className="rounded-circle" style={{height: '50px', width: '50px'}} />
                            <div className="d-flex flex-column">
                              <h5 className='text-end'>
                              {
                                msg.participants[0].username === username ? msg.participants[1].name : msg.participants[0].name
                              }
                              </h5>
                              <p className='mb-0 text-end'>{msg.messages[msg.messages.length-1].text}</p>
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
                <div className="d-flex justify-content-center align-items-center" style={{height: '85vh'}}>
                  <h2 className="text-center text-white">Select the Chat to show here</h2>
                </div>
                :
                <div className="d-flex flex-column justify-content-between" style={{height: '85vh'}}>
                  
                  <div className="d-flex flex-column overflow-auto p-3">
                    {
                      person.messages.map((msg, index) => {
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

                  <div className="d-flex justify-content-between align-items-center" style={{height: '10vh'}}>
                    <textarea className="form-control m-3" id="message" rows="1" placeholder="Message" required="required" data-validation-required-message="Please enter a message." name="text" value={text.text} onChange={(e) => setText({text: e.target.value})} style={{'resize':'none'}}></textarea>
                    <button className="btn btn-primary btn-xl m-3" id="sendMessageButton" type="submit" onClick={sendMessage}>
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>

                </div>
              }
            </div>

          </div>
        </section>
      }
    </>
  )
}

export default Messages