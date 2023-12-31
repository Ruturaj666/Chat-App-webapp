import React,{ useState } from 'react';
import styled from 'styled-components';
import { IoMdSend } from 'react-icons/io';


export default function ChatInput({handleSendMsg}) {
    const [msg, setMsg] = useState("");

    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length>0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };
  return (
    <Container>
        <div className="button-container">
            <form className="input-container" onSubmit={(e) => sendChat(e)}>
                <input type="text" placeholder="type your message here" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                <button className='submit'>
                    <IoMdSend />
                </button>
            </form>
        </div>
    </Container>
  );
}

const Container = styled.div`
    
    align-items: center;
    background-color: #080420;
    padding: 0.2rem;
    padding-bottom: 0.3rem;
    .button-container {
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;

    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-content: center;
        gap: 2rem;
        background-color: #ffffff34;
        input {
            width:90%;
            background-color:transparent;
            color: white;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection {
                background-color: #9a86f3;
            }
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #9a86f3;
            border: none;
            svg {
                font-size: 2rem;
                color: white;
            }
        }
    }
`;
