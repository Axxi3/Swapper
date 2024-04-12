import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import Lottie from "lottie-react";
import emailAnimation from "../assets/email.json"
import OtpInput from 'react-otp-input';
import { useRef } from 'react';

export default function OTPverification(props) {
    
    const location = useLocation();
    const navigate=useNavigate()
    const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array to store individual digits
    const inputRefs = useRef([]); 
   
    useEffect(()=>{
      if (location.state === null || location.state === '') {
        navigate("/sign-up");
      }
    })

    

    const handleChange = (event, index) => {
      const newOtp = [...otp];
      newOtp[index] = event.target.value;
      setOtp(newOtp);
  
      // Handle auto-focusing to the next input field
      if (event.target.value.length === 1 && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      } else if (event.target.value === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };
    
    

   

    const sendEmail=async ()=>{
    
      const response = await fetch ("/api/user/verify",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: location.state._id,
          email: location.state.email
        })
      })
  
      const data = await response.json() 
    console.log(data)
    }
    const handleSubmit =async (event) => {
      event.preventDefault();
      const fullOtp = otp.join(''); 
      if(fullOtp.length !== 6){
        alert("Please write the full OTP")
      } else {
       try {
         const response =await fetch("/api/user/verify-otp",{
           method:"POST",
           headers: {
             'Content-Type': 'application/json'
           },
           body:JSON.stringify({
             id: location.state._id,
             otp: fullOtp
           })
 
           
         })
 
         const data =await response.json()
 
         if(data.success){
          history.replaceState(null, '')
           navigate("/")
         } else {
           alert(data.message)
         }
       } catch (error) {
          console.log("Error",error)
       }
        
      }
      
    };
    
    useEffect(()=>{
    sendEmail()
    },[])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-purple-300">
      <h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl'>Please enter the otp that we send on your mail</h2>
    <div className="lottie flex justify-center h-[200px]">
      <Lottie animationData={emailAnimation} autoPlay loop className='h-[100%] w-[100%]'/>
    </div>
    <div className="">
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            className="w-10 h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-center text-xl font-medium"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-700 text-white text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-2"
      >
        Submit OTP
      </button>
    </form>
    </div>
  </div>
  
  )
}



