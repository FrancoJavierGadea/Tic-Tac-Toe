import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { MultiplayerContext } from "../Multiplayer/MultiplayerProvider";

const StyledChat = styled.div`

    width: 320px;
    height: 250px;
    position: absolute;
    bottom: 0;
    right: 0;
    border-top-left-radius: 10px;

    background-color: #000000;
    box-shadow: 0px 0px 5px 0px rgba(89, 127, 253, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const MessagesContainer = styled.div`

    height: calc(250px - 31px);

    color: white;
    padding: 5px 10px;

    overflow-y: auto;
    overflow-x: hidden;

    .message .message-notification {
        color: gray;
    }

    /* ===== Scrollbar CSS ===== */
    /* Firefox */
    & {
        scrollbar-width: auto;
        scrollbar-color: #242451 #ffffff;
    }

    /* Chrome, Edge, and Safari */
    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: #ffffff;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #242451;
        border-radius: none;
        border: none;
    }
`;


function Chat() {

    const {playerName, sendChatMessage, listenChatMessages} = useContext(MultiplayerContext);

    const [messages, setMessages] = useState([]);

    useEffect(() => {

        const sub = listenChatMessages().subscribe(({data, message}) => {

            setMessages(oldMessages => [...oldMessages, data]);
        });
    
        return () => {
            sub.unsubscribe();
        }

    }, []);
    

    const handleKeyDown = ({key, target}) => {

        if(key === 'Enter' && target.value !== ''){

            sendChatMessage(target.value);

            target.value = '';
        }
    }

    return (<StyledChat>

        <MessagesContainer>
            {
                messages.map(({name, message, type}, index) => {

                    return <div className="message" key={'msg-'+index}>
                        {
                            type === 'notification' ? <span className="message-notification">{message}</span>
                            : <>
                                {name && <strong>{name}:</strong>}
                                
                                <span className="ps-1">{message}</span>
                            </>
                        }
                    </div>;
                })
            }
        </MessagesContainer>

        <Form.Control type="text" className="rounded-0" placeholder="Escribe un mensaje" onKeyDown={handleKeyDown} />
    </StyledChat>);
}

export default Chat;