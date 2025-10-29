import React from 'react'
import style from "./CreatePost.module.css"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';


export default function CreatePost() {
  
  function getUserData(){
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`,{
       headers:{
        token :localStorage.getItem("userToken")}
    })
  }

let {data ,isLoading ,isError ,error}= useQuery({
     queryKey : ['userData'],
     queryFn : getUserData,
     select: (data)=>data?.data?.user,
    })
    console.log(data)

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
  <div className='w-full max-w-md bg-white shadow-md rounded-xl p-4 mx-auto my-8 dark:bg-gray-900 dark:shadow-2xl'>
    <div className='flex items-start space-x-3'>
      <div>
              <img className='w-[40px]' src={data?.photo} alt="user photo" />
      </div>
      <div className='w-full'>
    <input type="text" {...register('body')} className='w-full rounded-lg p-1' placeholder='What do you feel?'/>
      </div>
  
  <div className="">
    <label htmlFor="photo" className=' items-center justify-center cursor-pointer text-center block w-full'> 
           <i className='fa-solid fa-image fa-xl text-fuchsia-900'></i></label>
      <input type="file" id='photo' {...register('image')}  className='hidden'/>
  </div>
  </div>
  <button className='mt-3 w-full bg-gradient-to-r from-purple-800 to-fuchsia-800 text-white py-2 rounded-lg hover:opacity-90 transition cursor-pointer'>Add Post</button>
  </div>
</form>
  </>
  )
}
