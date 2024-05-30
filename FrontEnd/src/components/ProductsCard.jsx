import { useNavigate } from 'react-router-dom'
import React from 'react'
import { useEffect } from 'react';

export default function ProductsCard({img,name,price,category,des,id}) {

  useEffect(()=>{
    console.log(name,id)
  },[])

  const navigate=useNavigate()

  function truncateString(str, maxLength) {
    // Check if the string length is greater than the maximum length
    if (str.length > maxLength) {
      // Truncate the string to the maximum length and add an ellipsis
      return str.substring(0, maxLength) + "...";
    } else {
      // If the string length is less than or equal to the maximum length, return the original string
      return str;
    }
  }
  const showInfo = () => {
    navigate(`/product-info/${id}`, { state: { productID: id } });
  }
  
  console.log(category)

  return (
    <div onClick={showInfo}  className="rounded-md border hover:cursor-pointer" id='card'>
          <img
            src={img[0]}
            alt="Laptop"
            className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
          />
          <div className="p-4">
            <h1 className="inline-flex items-center text-lg font-semibold">{truncateString(name,50)}</h1>
            <p className="mt-3 text-sm text-gray-600">
              {truncateString(des,120)}
            </p>
           
            <div className="mt-3 flex items-center space-x-2">
              <span className="block text-sm font-semibold">Price : </span>
              <span className="">{price}</span>
              
            </div>
            <div className="mt-5 flex items-center space-x-2">
              <span className="block text-sm font-semibold">Category : </span>
              {
                category !== null ?(
<span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
            {category}
            </span>
                ) :(
                  <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
            null
            </span>
                )
              }
              
            
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              View this Product
            </button>
          </div>
        </div>
  )
}
