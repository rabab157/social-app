import React, { useState } from 'react'
import style from "./UploadProfilePhoto.module.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UploadProfilePhoto() {

  const [isShow ,setIsShow]= useState(false);
  
  const form =useForm({
   defaultValues:{
     photo:"",

   }
  })
  
  let {register,handleSubmit}=form;


    function handleUploudPhoto(values){
     let myData = new FormData();
  myData.append('photo',values.photo[0])
  axios.put('https://linked-posts.routemisr.com/users/upload-photo',myData,{
    headers:{
      token:localStorage.getItem('userToken')
    }
  })
  .then((res)=>{
    if(res.data.message==='success'){
      toast.success('photo updated successfully')
    }
  })
  .catch((err)=>{
    toast.error(err.response.data.error)
  })
      }
     

    

    function changeShow(){
      setIsShow(!isShow)
    }
  return (
   <>
    

<div>
  <button onClick={changeShow} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="bg-fuchsia-800 text-white px-4 py-2 rounded-md hover:opacity-90 transition" type="button">
    Upload photo
  </button>
     

  {isShow&&(

  <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
           Upload Photo
          </h3>
          <button onClick={changeShow} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
           <i className='fas fa-close'></i>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5">
          <form onSubmit={handleSubmit(handleUploudPhoto)} className="space-y-4" action="#">
            <div>
           
              <input type="file"{...register("photo")} id="photo" className="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
         <label htmlFor="photo"   className='flex items-center gap-2 justify-center my-6 p-5 cursor-pointer '> 
           <i className='fa-solid fa-image fa-2xl text-fuchsia-800'></i></label>
            </div>
          
          
            <button type="submit" className="w-full text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800">Confirm upload photo</button>
           
          </form>
        </div>
      </div>
    </div>
  </div>
  )}
</div>




    </>
  )
}
