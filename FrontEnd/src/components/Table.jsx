import React from 'react'
import TableContent from './TableContent'
import { useNavigate } from 'react-router-dom'

export default function Table({data}) {
    const navigate=useNavigate()
    
    // const imgURL = data && data.length > 0 && data[0].image ? data[0].image[0] : null;

    // // Only log if imgURL exists
    // if (imgURL) {
    //     console.log(imgURL);
    // }
console.log("i am table",data[0])
    const handleClick=()=>{
        navigate("/addproduct")
    }

    const handleClick2 = () => {
      localStorage.removeItem('token');
      navigate("/");
      window.location.reload(); // Reload the page
  }

  return (
<section class="mx-auto w-full max-w-7xl px-4 py-4">
  <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
    <div>
      <h2 class="text-lg font-semibold">Products</h2>
      <p class="mt-1 text-sm text-gray-700">
        This is a list of all Products. You can add new Products, edit or
        delete existing ones.
      </p>
    </div>
    <div className='flex gap-5'>
      {/*Added logout button */}
    <button
        type="button"
        onClick={handleClick2}
        class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
       Log out
      </button>
      <button
        type="button"
        onClick={handleClick}
        class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Add new Product
      </button>
    </div>
  </div>
  <div class="mt-6 flex flex-col">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="overflow-hidden border border-gray-200 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  <span>Product</span>
                </th>
                <th
                  scope="col"
                  class="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Price
                </th>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                >
                  Number of Wishlist
                </th>
                
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
            {data.map((item, index) => (
  // Check if the inner array is not empty
  item.length > 0 && 
  <TableContent 
    key={index} 
    name={item[0].name} // Accessing the name property of the first object in the inner array
    date={new Date(item[0].dateTime).toString()}// Converting dateTime to Date object
    price={item[0].price} // Accessing the price property of the first object in the inner array
    img={item[0].image} // Accessing the image property of the first object in the inner array
  />
))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>

  )
}
