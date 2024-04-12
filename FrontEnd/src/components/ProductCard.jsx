import React from 'react'
import { Heart, Trash } from 'lucide-react'

export default function ProductCard({product}) {
  console.log("this is card")
  console.log(product)
  return (
    <div key={product.id} className="">
    <li className="flex py-6 sm:py-6 ">
      <div className="flex-shrink-0">
        <img
          src={product[0].image}
          alt={product[0].name}
          className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <a href={product.href} className="font-semibold text-black">
                  {product[0].name}
                </a>
              </h3>
            </div>
           
            <div className="mt-1 flex items-end">
            
              <p className="text-sm font-medium text-gray-900">
                &nbsp;&nbsp;$ {product[0].price}
              </p>
              &nbsp;&nbsp;
             
            </div>
          </div>
        </div>
      </div>
    </li>
    <div className="mb-2 flex">
   
      <div className="ml-6 flex text-sm">
        <button type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
          <Trash size={12} className="text-red-500" />
          <span className="text-xs font-medium text-red-500">Remove</span>
        </button>
      </div>
    </div>
  </div>
  )
}
