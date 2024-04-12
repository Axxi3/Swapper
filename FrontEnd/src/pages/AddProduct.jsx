import React, { useEffect, useRef, useState } from 'react'
import {  ArrowRight, Plus , Trash2 } from 'lucide-react';
import InputComponent from '../components/Input'
import Select from "react-dropdown-select";
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../components/config/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { v4 } from "uuid"

import loading from "../assets/loading.svg"



const options = [
  {
    id: 1,
    name: 'High School Books'
  },
  {
    id: 2,
    name: 'College Books'
  },
  {
    id: 3,
    name: 'Self-help Books'
  },
  {
    id: 4,
    name: 'Middle School Books'
  },
  {
    id: 5,
    name: 'Fantasy Books'
  },
  {
    id: 6,
    name: 'Science Fiction Books'
  },
  {
    id: 7,
    name: 'Mystery Books'
  },
  {
    id: 8,
    name: 'Thriller Books'
  },
  {
    id: 9,
    name: 'Romance Books'
  },
  {
    id: 10,
    name: 'Historical Fiction Books'
  },
  {
    id: 11,
    name: 'Biography Books'
  },
  {
    id: 12,
    name: 'Autobiography Books'
  }
];




export default function AddProduct() {
  const navigate=useNavigate()

  const [name, setname] = useState('');
  const [des, setdes] = useState('');
  const[category,setCategory] = useState("")
  const [price,setPrice]=useState(0)
  const hiddenFileInput = useRef(null); 
  const [downloadURL,setDownloadURL]=useState([])
  const [imagesReadyToUpload,setimagesReadyToUpload]=useState([])
  const [loadingorNOt,setLoading] =useState(false)
  const [downloadLink,setDownloadLink]=useState(null)

  const handleInputChangePrice = (inputValue) => {
    setPrice(inputValue); 
    console.log(price)
  };

  const handleInputChangeDownloadLink = (inputValue) => {
    setDownloadLink(inputValue); 
    console.log(downloadLink)
  };

  const handleInputChangeName = (inputValue) => {
    setname(inputValue); 
    console.log(name)
  };

  const handleInputCategory = (inputValue) => {
    setCategory(inputValue[0].name); 
    console.log(category)
  };

 

  const handleInputChangDes = (inputValue) => {
    setdes(inputValue); 
    console.log(des)
  };
  const handleSubmitForAddingProduct = async () => {
    setLoading(true);

    if (name === "" || des === "" || category === "") {
        return alert("Please Fill All The Fields");
    }else if(price === 0){
      return alert("Please Fill The Price Field")
    }else if(!imagesReadyToUpload.length==4){
      return alert("Please Upload 4 Images")
    

    }

    try {
        if (imagesReadyToUpload.length > 0 && imagesReadyToUpload.length < 7) {
            const urls = await Promise.all(imagesReadyToUpload.map(uploadImage));
            await uploadToDatabase(urls);
        }
    } catch (error) {
        console.error("Error occurred during image upload or database upload:", error);
        alert("An error occurred while adding the product. Please try again later.");
    }
};

const uploadImage = async (file) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            null, // No progress callback needed
            reject, // Handle error
            () => {
                // Upload successful, get download URL
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL);
                        console.log("Download URL:", downloadURL);
                    })
                    .catch(reject); // Pass any errors to the reject function
            }
        );
    });
};

const uploadToDatabase = async (urls) => {
    const response = await fetch("/api/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            class: String(category),
            image: urls,
            price: price,
            description: des,
            sellerID: localStorage.getItem("token"),
            name: name,
            downloadLink
        }),
    });

    const data = await response.json();

    if (data.success) {
        console.log("success");
        setname("");
        setCategory("");
        setDownloadURL([]);
        setPrice(0);
        setimagesReadyToUpload([]);
        alert("Product Added Successfully");
        navigate('/profile')
    }

    setLoading(false);
};




useEffect(()=>{
  console.log(downloadURL)
},[downloadURL])

  
  



  const handleClick = event => {
    hiddenFileInput.current.click();   
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    const updatedImages = [...imagesReadyToUpload, fileUploaded];
    setimagesReadyToUpload(updatedImages);
                  
  };

  const removeImage = (Deleteindex) => {
    const newData = imagesReadyToUpload.filter((_, index) => index !== Deleteindex);
    setimagesReadyToUpload(newData);
  };
  

  useEffect(()=>{
    console.log(imagesReadyToUpload)
  },[imagesReadyToUpload])

  return (
   <div className='flex flex-col items-center relative'>
    {
      loadingorNOt ? (
<div className="absolute z-99 w-[100vw] h-[100vh] flex items-center justify-center bg-transparent">
     <img src={loading} alt="" className='w-[200px] h-[200px] ' />
    </div>
      ) : null
    }

    
   <h2 class="text-2xl font-semibold text-center mt-7 leading-tight text-black sm:text-4xl lg:text-5xl">
      Product Information
      </h2>
    <div className="w-[70%] mt-8 flex flex-col gap-4">
      <div className="Image-container">
          <p className='text-lg font-semibold mb-2'>Add Images</p>
        <div className="Image  border-black border-[1.4px] flex px-5 gap-4 py-1 rounded-lg">
          {
            imagesReadyToUpload.map((image,index)=>(
              <div className="h-[100px] w-[100px] relative border-black border-[1.3px] rounded-lg flex items-center justify-center bg-white" key={index}>
                {/* <Trash2 width={20} height={20} enableBackground={"red"} className='cursor-pointer bg-red-400 rounded-sm absolute z-99 top-2 left-2'/> */}
              <img className="h-full w-full bg-[#bbb9b9] rounded-lg flex items-center justify-center" src={URL.createObjectURL(image)} key={index}/>
            </div>
            ))
          }
         
          
          <button 
        className="button-upload bg-[#d3d5d6] h-[100px] w-[100px] flex items-center justify-center border-dotted border-black border-[2px] rounded-lg"
        onClick={handleClick}  
    
      >
        <Plus width={30} height={30}/>
      </button>
         <input 
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{display:'none'}}
      />
        </div>
        </div>
        <div className="name">
          <InputComponent onInputChange={handleInputChangeName} name="Name"/>
        </div>
      
        <div className="description">
          <InputComponent onInputChange={handleInputChangDes} name="Description"/>
        </div>
        <div className="Class">
        <label
    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-4"
    htmlFor="Options"
  >Category</label>
        <Select
  options={options}
  className='rounded-full'
  labelField="name"
  valueField="id"
  onChange={handleInputCategory}
/>
        </div>
        <div className="Price">
          <InputComponent onInputChange={handleInputChangePrice} name="Price"/>
        </div>
        <div className="Download Link">
          <InputComponent onInputChange={handleInputChangeDownloadLink} name="Download Link"/>
        </div>
    </div>
    <div className="mt-4 w-[70%] flex items-center justify-evenly">
    <Link
                to={'/'}
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Cancel
              </Link>
              <button
              onClick={handleSubmitForAddingProduct}
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Add this Product <ArrowRight className="ml-2" size={16} />
                  </button>
               
    </div>
   </div>
  )
}
