import React,{ useState, useEffect } from 'react';
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if(localStorage.getItem("my-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()) {
      console.log("in validation", registerRoute);
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute , {
        username,
        email,
        password,
      });
      if(data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true) {
        localStorage.setItem('my-app-user', JSON.stringify(data.user));
        console.log(localStorage.getItem("my-app-user"));
        navigate("/");
      }
    };
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
      if (password !== confirmPassword) {
        toast.error("password and confirm password should be same", toastOptions);
        return false;

      } else if (username.length<4) {
          toast.error("username should be greater than 3 characters", toastOptions);
          return false;

      } else if (password.length<8) {
          toast.error("password should be greater than or equal to 8 characters", toastOptions);
          return false;

      }else if (email === "") {
        toast.error("email is required", toastOptions);
        return false;
      }
      return true;
  };

  const handleChange= (event) =>{
    setValues({...values,[event.target.name]:event.target.value});
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event => handleSubmit(event))}>
          <div className='brand'>
            <img src="" alt='Logo' />
            <h1>SNAPPY</h1>
          </div>
          <input 
            type="text" 
            placeholder='UserName'
            name="username" 
            onChange={e => handleChange(e)}
          />
          <input 
            type="email" 
            placeholder='Email'
            name="email" 
            onChange={e => handleChange(e)}
          />
          <input 
            type="password" 
            placeholder='Password'
            name="password" 
            onChange={e => handleChange(e)}
          />
          <input 
            type="password" 
            placeholder='Confirm Password'
            name="confirmPassword" 
            onChange={e => handleChange(e)}
          />
          <button type="submit">CREATE USER</button>
          <span>ALREADY HAVE AN ACCOUNT? <Link to= "/login">LOGIN</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.2rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border-radius: 0.4rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      font-size: 1rem;
      transition: 0ms.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      a{
        color: #4e0eff;
        font-weight: bold;
      }
    }
  }
`;

export default Register