import React from 'react'
import style from "./Profile.module.css"
import  axios  from 'axios';
import { useQuery } from '@tanstack/react-query';
import UserPosts from '../UserPosts/UserPosts';
import ChangePasswordModal from './../ChangePasswordModal/ChangePasswordModal';
import UploadProfilePhoto from '../UploadProfilePhoto/UploadProfilePhoto';
import CreatePost from '../CreatePost/CreatePost';

export default function Profile() {

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
    console.log(data?._id)
  return (<>
  <div className='w-full md:w-[80%]  lg:w-[60%] mx-auto text-center bg-slate-300 border-2 border-slate-800 p-4 '>
<img src={data?.photo} alt="" className='size-[50px] mx-auto' />
<p>Name : {data?.name}</p>
<p>Gender : {data?.gender}</p>
<p>Email : {data?.email}</p>
<p>Birthday : {data?.dateOfBirth}</p>

  </div>
  <CreatePost key={data?._id}/>
{data&&(
<UserPosts id={data?._id}/>
)}  
<div className='w-full md:w-[80%] flex gap-3 flex-col items-center justify-center  lg:w-[60%] mx-auto text-center bg-slate-300 border-2 border-slate-800 p-4 '>

<ChangePasswordModal/>
<UploadProfilePhoto/>
</div>
  </>
  )
}
