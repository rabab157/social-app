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

<div className="flex flex-col items-center mt-10 space-y-8">


  <div className="w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden relative dark:bg-gray-900 ">
    <div className="h-24 bg-gradient-to-r from-purple-800 to-fuchsia-800"></div>
    
   
    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <img
        src={data?.photo}
        alt="user"
        className="w-24 h-24 rounded-full border-4 border-white shadow-md"
      />
    </div>

  
    <div className="pt-16 pb-6 text-center px-6 ">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{data?.name}</h2>
      <p className="text-gray-500 dark:text-white">{data?.gender}</p>
      <p className="mt-2 text-sm text-gray-600 dark:text-white">{data?.email}</p>
      <p className="text-sm text-gray-600 dark:text-white">Birthday: {data?.dateOfBirth}</p>
    </div>
    <div className="flex justify-center space-x-3 my-2">
      
<UploadProfilePhoto/>
<ChangePasswordModal/>
   
  </div>
  </div>
</div>

  <CreatePost key={data?._id}/>
{data&&(

<UserPosts id={data?._id}/>
 
)}  














  </>
  )
}
