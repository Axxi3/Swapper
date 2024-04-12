import React from 'react'
import Table from '../components/Table'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react';
import loader from "../assets/loading.svg"

const token = localStorage.getItem('token');

export default function DashBoards() {

  const [name,setname]=useState("")
  const[subname,setSubname]=useState("")
  const[email,setEmail]=useState("")
  const [loading,setLoading]=useState(false)
const [tableData,setTableData]=useState([{}])
  

const getUSerData= async()=>{
  setLoading(true)
  console.log("iam token", token)
  const res=await fetch(`/api/user?id=${token}`,{
    method:"GET"
  })

  const data= await res.json()
  setname(data.Name)
  setEmail(data.email)
  setSubname(name.substring(0, 2))
  setLoading(false)
  
  getListedProducts()
}


const getListedProducts = async () => {
  try {
    const res = await fetch(`/api/listed-products?id=${token}`, {
      method: "GET"
    });
    const data = await res.json();
    console.log(data);
    

    // Use Promise.all to resolve all promises returned by getProductInfo
    const promises = data.products.map((id) => getProductInfo(id));
    const tableDatailsStoredTemporarilyHereSoThatItcanBePassesToUseState = await Promise.all(promises);

    setTableData(tableDatailsStoredTemporarilyHereSoThatItcanBePassesToUseState);

    console.log(tableDatailsStoredTemporarilyHereSoThatItcanBePassesToUseState);
  } catch (error) {
    console.error('Error fetching listed products:', error);
  }
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
    getUSerData()
  },[])

  



  return (
    <>
    <Navbar/>

    {
      loading ?(
        <div className='flex justify-center items-center h-[100vh]'>
          <img src={loader} alt="" className='h-[200px] w-[200px]' />
        </div>
      ) : (
        <> <div className="Top-Sec">
              <h2 class="text-3xl font-bold text-center mt-7 leading-tight text-black sm:text-4xl lg:text-5xl">
                Account Information
              </h2>
              <div className="flex items-center justify-center mt-[40px] gap-[6%]">
                <div className="1">
                  <img src={`https://ui-avatars.com/api/?format=svg&name=${subname}`} alt="" className='h-[150px] w-[150px] rounded-full' />
                </div>
                <div className="2 flex flex-col gap-2">
                  <h2 className='text-2xl font-semibold'>{name}</h2>
                  <h4 className='text-md '>{email}</h4>
                </div>
              </div>
            </div><div className="another-sec">{
              tableData== {}? null:(
                <Table data={tableData}/>
              )
            }
                
              </div> </>
      )
    }


   
   </>
  )
}
