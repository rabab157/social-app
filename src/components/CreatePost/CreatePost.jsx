import React from 'react'
import style from "./CreatePost.module.css"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function CreatePost() {
const queryClient=useQueryClient()
  let form = useForm({
    defaultValues:{
      body:"",
      image:"",
    }
  })

  let {register,handleSubmit}=form;

  async function handelAddPost(values){
    try{
      let myData=new FormData()
    myData.append('body',values.body);
    myData.append('image',values.image[0]);

    let response= await axios.post('https://linked-posts.routemisr.com/posts',myData,{
      headers:{
        token:localStorage.getItem('userToken')
      }
    })
    if(response.data.message==='success'){
      toast.success('Post Added Successfully')
      queryClient.invalidateQueries({
        queryKey:['userPosts']
      })
    }
    console.log(response);
  }
  catch(err){
    toast.error(err.response.data.error)
  }

  }
  return (<>
  
<form onSubmit={handleSubmit(handelAddPost)}>
  <div className='w-full md:w-[80%] lg:w-[60%] mx-auto bg-slate-200 my-6 p-3 border border-slate-800 border-2'>
    <div>
    <input type="text" {...register('body')} className='w-full border border-slate-400 rounded-lg p-2' placeholder='Post Details'/>
  </div>
  <div className='my-4'>
    <label htmlFor="photo" className='flex items-center gap-2 justify-center my-6 p-5 cursor-pointer text-center block w-full bg-red-400 '> 
           <i className='fa-solid fa-image fa-2xl'></i></label>
      <input type="file" id='photo' {...register('image')}  className='hidden'/>
  </div>
  <button className='bg-blue-600 text-white w-full rounded-lg p-2 cursor-pointer'>Add Post</button>
  </div>
</form>
  </>
  )
}
