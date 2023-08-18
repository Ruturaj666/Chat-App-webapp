import React,{ useState, useEffect } from 'react';
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    
    password: "",
    
  });

  useEffect(() => {
    if(localStorage.getItem("my-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()) {
      console.log("in validation", loginRoute);
      const { username, password } = values;
      const { data } = await axios.post(loginRoute , {
        username,
        
        password,
      });
      if(data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true) {
        localStorage.setItem('my-app-user', JSON.stringify(data.user));
        navigate("/");
      }
    };
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
      if (password === "") {
        toast.error("username and Password is required", toastOptions);
        return false;

      } else if (username === "") {
          toast.error("username and Password is required", toastOptions);
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
            min = "3"
          />
        
          <input 
            type="password" 
            placeholder='Password'
            name="password" 
            onChange={e => handleChange(e)}
          />
         
          <button type="submit">Login</button>
          <span>DON'T HAVE AN ACCOUNT? <Link to= "/register">Register Here</Link>
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

export default Login