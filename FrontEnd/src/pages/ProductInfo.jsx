import React from 'react'
import Navbar from '../components/Navbar'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react';

export function ProductInfo() {
    const { id } = useParams(); // Use the correct parameter name
    const [info,setinfo]=useState(); 
    const[loading,setloading]=useState(false)

    
    useEffect(() => {
       
        getProductDetails();
    }, []); // Empty dependency array means this effect runs only once after the component mounts

    const getProductDetails = async () => {
        setloading(true)
        try {
            const response = await fetch(`/api/product-info?id=${id}`);
            const data = await response.json();
            console.log('Product details:', data[0]); // Log the fetched data
            setinfo(data[0])
            setloading(false)
        } catch (error) {
            console.error('Error fetching product details:', error); // Log any errors that occur
            
        }
    };

    const addtoWishlist=async ()=>{
        const response =await fetch(`/api/addtoWishList`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                userID:localStorage.getItem("token"),
                product:id
            })
        })

        const data=await response.json()
        console.log("this is data",data)
        getProductInfo(data.products)
    }

    const getProductInfo=()=>{
        
    }
    const Navigate=useNavigate()

    const startachat=async()=>{
        if(info.sellerID===localStorage.getItem("token")){
            alert("you can't chat with yourself")
            return
        }


      const response= await fetch("/api/chat",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          receiverId:info.sellerID,
          senderId:localStorage.getItem("token")

        })
      })

      const data=await response.json()
      
      console.log("this is chat data", data)
      Navigate("/chats")
    }

    
    // const addtoWishlist = async () => {
    //     try {
    //         const response = await fetch(`/api/wishlist?userID=${localStorage.getItem("token")}&product=${id}`, {
    //             method: "GET",
                
    //         });
    
    //         console.log('Response from server:', response);
    
    //         const data = await response.json();
    //         console.log("wishlist", data);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }

    


  return (
    <>
    <Navbar/>
    {
        loading?<h1>Loading...</h1>:
        info && (
<div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
      <div className="pt-8">
        <div className="flex items-center">
          <ol className="flex w-full items-center overflow-hidden">
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
           
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a className="capitalize" href="#">
                {info.name}
              </a>
            </li>
          </ol>
        </div>
      </div>
      <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        <div className="col-span-5 grid grid-cols-2 gap-2.5">
          {info.image.map((image, index) => (
            <div key={index} className="col-span-1 transition duration-150 ease-in hover:opacity-90">
            <img
              src={image}
              alt="Nike Air Max 95 By You--0"
              className="w-full object-cover"
            />
          </div>
          ))}
        </div>
        <div className="col-span-4 pt-8 lg:pt-0">
          <div className="mb-7 border-b border-gray-300 pb-7">
            <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
             {info.name}
            </h2>
            <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
              {info.description}
            </p>
            <div className="mt-5 flex items-center ">
              <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                ${info.price}
              </div>
            </div>
          </div>
         
          <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
          <button
              type="button"
              onClick={startachat}
              className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Start a Chat
            </button>
            <button
              type="button"
              onClick={addtoWishlist}
              className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add to Wishlist
            </button>
          </div>
         
         
        
       
        </div>
      </div>
    </div>
        )
    }
    
    </>
  )
}
