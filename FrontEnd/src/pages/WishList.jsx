
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { useEffect } from 'react'
import loader from "../assets/loading.svg"
import empty from "../assets/empty.jpg"





const products = [
  {
    id: 1,
    name: 'Nike Air Force 1 07 LV8',
    href: '#',
    price: '₹47,199',
    originalPrice: '₹48,900',
    discount: '5% Off',
    color: 'Orange',
    size: '8 UK',
    imageSrc:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
  },
  {
    id: 2,
    name: 'Nike Blazer Low 77 SE',
    href: '#',
    price: '₹1,549',
    originalPrice: '₹2,499',
    discount: '38% off',
    color: 'White',
    leadTime: '3-4 weeks',
    size: '8 UK',
    imageSrc:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png',
  },
  {
    id: 3,
    name: 'Nike Air Max 90',
    href: '#',
    price: '₹2219 ',
    originalPrice: '₹999',
    discount: '78% off',
    color: 'Black',
    imageSrc:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png',
  },
]

export default function WishList() {

  const [wishlistData,setWishListData]=useState([])
  const [loading,setLoading]=useState(false)

  const getWishList=async()=>{
    setLoading(true)
    const response=await fetch (`/api/wishlist?id=${localStorage.getItem("token")}`,{
      method:"GET",
    })

    const data= await response.json()

    console.log("this is data",data)

    if(!data.success){
      setLoading(false)
      return
    }

    const promises = data.userExists.products.map((id) => getProductInfo(id));

    const tableDatailsStoredTemporarilyHereSoThatItcanBePassesToUseState = await Promise.all(promises);
    setWishListData(tableDatailsStoredTemporarilyHereSoThatItcanBePassesToUseState)

    console.log(tableDatailsStoredTemporarilyHereSoThatItcanBePassesToUseState)
    setLoading(false)
  }

  const getProductInfo = async (id) => {
    try {
      const response = await fetch(`/api/product-info?id=${id}`);
      const data = await response.json();
      console.log('Product details:', data);
      return data;
    } catch (error) {
      console.error('Error fetching product info for ID:', id, error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }

  useEffect(()=>{
    getWishList()
  },[])


  return (
    <>
    <Navbar/>
    {loading?(
      <div className="flex justify-center items-center h-screen w-screen">
        <img src={loader} alt=""  className='h-[200px] w-[200px]'/>
      </div>
    ):(
<div className="mx-auto max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Your WishList
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className="divide-y divide-gray-200">
              
              { wishlistData.length!==0 &&wishlistData.map((product, index) => (
              <ProductCard product={product}/>
              ))}

              {
                wishlistData.length===0 &&(
                  <div className="flex justify-center items-center h-screen w-screen">
                    <img src={empty} alt="" className='w-[200px] h-[200px]' />
                  </div>
                )
              }
            </ul>
          </section>
          {/* Order summary */}

          
         
        </form>
      </div>
    </div>
    )}


    
    </>
  )
}
