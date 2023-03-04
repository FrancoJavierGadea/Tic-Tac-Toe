import { useContext, useEffect, useRef, useState } from "react";
import { Accordion, Button, Form, useAccordionButton } from "react-bootstrap";
import styled from "styled-components";
import { MultiplayerContext } from "../Multiplayer/MultiplayerProvider";

const StyledChat = styled(Accordion)`
    
    --bs-accordion-bg: #2A2A4F;
    --bs-accordion-active-bg: #2A2A4F;
    --bs-accordion-btn-color: #fff;
    --bs-accordion-active-color: #fff;

    --bs-accordion-btn-icon: var(--bs-accordion-btn-active-icon);
    --bs-accordion-border-color: #0E60DB;
    --bs-accordion-btn-focus-box-shadow: initial;

    min-width: 300px;

    .accordion-body {
        --bs-accordion-body-padding-x: 0;
        --bs-accordion-body-padding-y: 0;
    }
    .accordion-item {
        --bs-accordion-bg: #000000;
    }

`;

const MessagesContainer = styled.div`

    --chat-height: ${props => props.height || '250px'};  

    height: calc(var(--chat-height) - 31px);

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


function Chat({style, height = '250px'}) {

    const {playerName, sendChatMessage, listenChatMessages} = useContext(MultiplayerContext);

    const [messages, setMessages] = useState([]);

    const messagesEndRef = useRef(null);

    useEffect(() => {

        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });

    }, [messages]);


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

    return (<StyledChat flush style={style}>

        <Accordion.Item eventKey="0">

            <Accordion.Header>Chat</Accordion.Header>

            <Accordion.Body>  
                <MessagesContainer height={height}>
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
                    <div ref={messagesEndRef}></div>
                </MessagesContainer>

                <Form.Control type="text" className="rounded-0" placeholder="Escribe un mensaje" onKeyDown={handleKeyDown} />
            </Accordion.Body>

        </Accordion.Item>  
                 

    </StyledChat>);
}

export default Chat;