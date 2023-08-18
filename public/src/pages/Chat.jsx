import React,{ useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  const doSomething = async() =>{
    if(!localStorage.getItem("my-app-user")){
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("my-app-user")));
      setIsLoaded(true);
    }
  };
  useEffect (() => {
    doSomething();
  }, []);

  useEffect(() => {
    if(currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id)
    }
  }, [currentUser])

  const doSomething2 = async() =>{
    if (currentUser){
      const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
      setContacts(data.data);
    }
  };
  useEffect(() => {
    doSomething2();
  }, [currentUser]);
  
  const handleChatChange =(chat) =>{
    setCurrentChat(chat);
  }
  return (
    <Container>
      <div className="container">
        <Contacts contacts={ contacts } currentUser={ currentUser } changeChat={ handleChatChange } />
        {
          isLoaded && currentChat === undefined ? (
          <Welcome currentUser={ currentUser } />
          ) : (
          <ChatContainer currentChat={currentChat} currentUser={ currentUser } socket = {socket} />
          ) 
        }
        
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
  }
`;

export default Chat