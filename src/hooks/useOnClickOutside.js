import React, { useEffect } from 'react'

export default function useOnClickOutside(ref,handler){
    useEffect(()=>{
      const listener = (e)=>{
        //console.log(ref.current);
        if(!ref.current || ref.current.contains(e.target)){
            return;
        }else{
            handler();
        }
    }
    document.addEventListener("mousedown",listener);
    document.addEventListener("touchstart",listener);
    return()=>{
        document.removeEventListener("mousedown",listener);
        document.removeEventListener("touchstart",listener);
    }
    },[ref,handler])
  return (
    <div>useOnClickOutside</div>
  )
}
 
