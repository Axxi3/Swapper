
import React from 'react'


export default function TableContent({name,date,price,img}) {


  return (
<tr>
                <td class="whitespace-nowrap px-4 py-4 items-center">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img
                        class="h-10 w-10 rounded-full object-cover"
                        src={img}
                        alt=""
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {name}
                      </div>
                      <div class="text-sm text-gray-700">listed on {date}</div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-12 py-4 flex items-center">
                  <div class="text-sm text-gray-900 ">{price}</div>
             
                </td>
                <td class="whitespace-nowrap px-4 py-4">
                  <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                   Listed
                  </span>
                </td>
                <td class="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
               0
                </td>
                <td class="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                  <a href="#" class="text-gray-700">
                    Remove
                  </a>
                </td>
              </tr>
  )
}
