import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../svg/happy-emoji-svgrepo-com.svg';
import './Nav.css';


export default function Nav() {
  
    const [show,setShow] = useState(false);
    const [searchValue,setSearchValue] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>50){
                setShow(true);
            }else{
                setShow(false);
            }
        })
        return ()=>{
            window.removeEventListener("scroll",()=>{});
        }
    },[]);

    const changeValue = (e)=>{
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }

    return (
    <nav className={`nav ${show && "nav_black"}`}>
        <img 
            alt="Netflix logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            className='nav_logo'
            onClick={()=>{
                if(searchValue){
                    setSearchValue("");
                }
                navigate("/");
            }}

        /> 
        <input value={searchValue} onChange={changeValue}
            placeholder="영화를 검색해주세요."
            type='text'
            className='nav_input'

        />
        <img 
            alt='User logged'
            src={Logo}
            className='nav_avatar'
        />
    </nav>
  )
}
