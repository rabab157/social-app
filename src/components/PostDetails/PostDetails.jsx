import React from 'react'
import style from "./PostDetails.module.css"
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Comment from './../Comment/Comment';


export default function PostDetails() {
  let{id}=useParams();

  function getSinglePost(){
 return axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
  headers:{
    token: localStorage.getItem("userToken")
  },
 });
  }

  let {data ,isLoading ,isError,error}= useQuery({
    queryKey:['getSinglePost'],
    queryFn:getSinglePost,
    select: (data)=>data?.data?.post,
  })
  return (
 <div  className=' w-full md:w-[80%] lg:w-[50%] rounded-md bg-slate-200 mx-auto my-8 p-4'>
<div className='flex justify-between items-center mb-4'>
  <div className='flex items-center gap-4'>
    <img src={data?.user.photo} alt=""  className='size-[35px]'/>
    <p>{data?.user.name}</p>
  </div>
  <div className='text-xs text-slate-500'>
    {data?.createdAt}
  </div>
</div>
      {data?.body && <h2 className='mb-4'>{data?.body}</h2>}
      {data?.image && <img src={data?.image} alt={data?.body}  className='w-full rounded-md ' />}
      
      {data?.comments.map((comment)=> <Comment key={comment.id} comment={comment}/>)}
      </div>
  )
}
