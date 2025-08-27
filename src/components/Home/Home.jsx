import React, { useContext, useEffect ,useState } from 'react'
import style from "./Home.module.css"
import { PostContext } from '../../Context/PostContext'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Comment from './../Comment/Comment';
import { Link } from 'react-router-dom';
import CreateCommentModal from './../CreateCommentModal/CreateCommentModal';
import CreatePost from './../CreatePost/CreatePost';



export default function Home() {
// let {getAllPosts}=useContext(PostContext);
// const [posts ,setposts]=useState([])

// async function getPosts (){
  
//   let res = await getAllPosts();
//   if(res.length){
//     setposts(res);
//   }
//   else{
//   }
  
// }
// useEffect(()=>{
   
// getPosts ()
//   },[])

function getAllPosts (){
  return axios.get('https://linked-posts.routemisr.com/posts?limit=50',{
    headers : {
      token : localStorage.getItem("userToken")
    }
  })
}
let {data ,isLoading ,isError,error}= useQuery({
  queryKey:["getPosts"],
  queryFn:getAllPosts,
  select: (data)=>data?.data?.posts
 })
 console.log(data)

 if(isError){
  return <h3>{error.message}</h3>
 }
 if(isLoading){
  return <div className="spinner"></div>
 }

  return (
    <>

    <CreatePost/>
    {data.map((post)=>(
      <div  className=' w-full md:w-[80%] lg:w-[50%] rounded-md bg-slate-200 mx-auto my-8 p-4'>
        <Link key={post?.id} to={`/postdetails/${post?.id}`}>
<div className='flex justify-between items-center mb-4'>
  <div className='flex items-center gap-4'>
    <img src={post?.user.photo} alt=""  className='size-[35px]'/>
    <p>{post?.user.name}</p>
  </div>
  <div className='text-xs text-slate-500'>
    {post?.createdAt}
  </div>
</div>
      {post?.body && <h2 className='mb-4'>{post?.body}</h2>}
      {post?.image && <img src={post?.image} alt={post?.body}  className='w-full rounded-md ' />}
      {console.log(post)}
    </Link>
      <div>
        {post?.comments?.[0] && (
  <Comment comment={post.comments[0]} />
)}
         </div>
     {post &&(
       <CreateCommentModal postId= {post?.id}/>
    )} 
      </div>
    ))}
    </>
    );
}
