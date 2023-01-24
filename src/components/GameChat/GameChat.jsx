import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MultiplayerContext } from "../MutiplayerProvider/MultiplayerProvider";

const StyledChat = styled.div`

    background-image: linear-gradient(45deg, #0D0D43 0%, #38387B 100%);

    height: 300px;
    min-width: 400px;
    max-width: 700px;
    display: flex;
    flex-direction: column;

    position: fixed;
    bottom: 0;
    right: 0;
    border-top-left-radius: 10px;
    box-shadow: -1px 0px 12px 1px rgba(255,255,255,.2);

    input[type="text"]{
        width: 100%;
        margin-top: auto;
    }

    .chat-messages {
        overflow-y: auto;
        overflow-x: hidden;
        --scrollbar-color: #737373;
        scrollbar-width: auto;
        scrollbar-color: var(--scrollbar-color) #ffffff;
    }
    .chat-messages::-webkit-scrollbar {
        width: 5px;
    }
    .chat-messages::-webkit-scrollbar-track {
        background: #ffffff;
    }
    .chat-messages::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-color);
        border-radius: 10px;
        border: 2px solid var(--scrollbar-color);
    }

    .chat-messages .message {
        color: white;
        display: flex;
    }
`;

function GameChat() {

    
    const { chatMessages, sendMessage, room, userName } = useContext(MultiplayerContext);
    
    const [message, setMessage] = useState('');
    
    //? Mantener el Scroll del chat siempre abajo
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        
        if(chatMessagesRef.current){

            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight - chatMessagesRef.current.clientHeight;
        }

    }, [chatMessages]);

    const handleChange = ({target: {value}}) => {

        setMessage(value);
    }

    const handleKeyDown = ({key}) => {

        if(key === 'Enter'){

            sendMessage(room, {name: userName, content: message});

            setMessage('');
        }
    }

    return (<StyledChat>

        <div className="chat-messages p-2" ref={chatMessagesRef}>
            {
                chatMessages.map(({name, content}, index) => {

                    return (<div className="message" key={'message-' + index}>
                        <strong className="me-1">{name}:</strong><p>{content}</p>
                    </div>)  
                })
            }
        </div>

        <input className="form-control rounded-0" type="text" placeholder="Escribe un mensaje" value={message} onChange={handleChange} onKeyDown={handleKeyDown} />

    </StyledChat>);
}

export default GameChat;