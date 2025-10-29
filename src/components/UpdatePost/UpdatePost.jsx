import React, { useState } from 'react'
import style from "./UpdatePost.module.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';


export default function UpdatePost({id}) {
    let queryClient =useQueryClient()
  const [isShow ,setIsShow]= useState(false);
    
  const form=  useForm({
defaultValues:{
    body:"",
    image:""
    
}
    })

    
    let {register,handleSubmit}=form;
    
    async function handleUpdate(values){
        let myData=new FormData();
        myData.append("body",values.body);
        myData.append("image",values.image[0]);

        try{

            console.log(values);
          let res = await axios.put(`https://linked-posts.routemisr.com/posts/${id}` ,myData,{
            headers : {
          token : localStorage.getItem("userToken")
        },
          });

          if(res.data.message==="success"){
              toast.success("Post Updated successfully")
           queryClient.invalidateQueries({queryKey:["userPosts"]})

          }
        }
        catch(err){
 toast.err(err.message)
        }

    }


   function toggleShow(){
    setIsShow(true);
   }
  return (
    <>
    


<span  onClick={toggleShow} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="text-blue-600  px-3 py-2 rounded-md hover:text-blue-700 cursor-pointer">
  Update Post
</span>
{isShow &&(
<div id="authentication-modal"  aria-hidden="true" className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Update Post
                </h3>

                <button onClick={()=> {setIsShow(false)}} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <i className='fas fa-close cursor-pointer'></i>
                    <span className="sr-only">Close model</span>
                </button>
            </div>
            <div className="p-4 md:p-5">
                <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4" action="#">
                    <div>
                        <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Text</label>
                        <input type="text" id="comment" {...register("body")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  placeholder='Post Details...' />
                    </div>
                    <div>
                        <input  type="file"  id="image" {...register("image")}  className="hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  />
                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center p-4 cursor-pointer w-full">
                            <i className='fa-solid fa-image fa-2xl text-fuchsia-800'></i></label>
                    </div>
                   
                      
                    <button type="submit" className="w-full text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-blue-800">Update Post</button>
                    
                </form>
            </div>
        </div>
    </div>
</div> 
)}


    </>
  )
}
