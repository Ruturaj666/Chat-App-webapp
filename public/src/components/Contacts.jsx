import React, { useState, useEffect} from 'react';
import styled from "styled-components";
import Logo from "../assets/l.jpg";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [ currentUserName, setCurrentUserName ] = useState(undefined);
  const [ currentSelected, setCurrentSelected ] = useState(undefined);  
  useEffect(() => {
      if(currentUser){
        setCurrentUserName(currentUser.username);
      }
    }, [currentUser])
    const changeCurrentChat = (index, contact) => {
      setCurrentSelected(index);
      changeChat(contact);
    }
  return <>
    {
      currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {
              contacts.map((contact,index)=>{
                return (
                  <div className={`contact ${index === currentSelected ? "selected":"" }`} key={index} onClick={() => changeCurrentChat(index, contact)}>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>

                )
              })
            }
          </div>
          <div className="currentUser">
            <h2>{currentUserName}</h2>
          </div>
        </Container>
      )
    }
  </>
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
  }
  h3,h1 {
      color: white;
      text-transform: uppercase;
  }
  

  .contacts {
    display:flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
    }
    .selected {
      background-color: #0d0d30;

    }
  }

  .currentUser {
    color:white;
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
`;