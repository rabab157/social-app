import React from 'react'
import style from './UserPosts.module.css'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import  axios  from 'axios';
import { Link } from 'react-router-dom';
import CreateCommentModal from './../CreateCommentModal/CreateCommentModal';
import Comment from '../Comment/Comment';
import UpdatePost from '../UpdatePost/UpdatePost';
import toast from 'react-hot-toast';


export default function UserPosts({id}) {
  const queryClient = useQueryClient()
  function getUserPosts(){
  return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?`,{
      headers:{
          token:localStorage.getItem("userToken"),
      }
  })
  }
    let {data,error ,isLoading ,isError}=useQuery({
        queryKey :["userPosts"],
        queryFn :getUserPosts,
         select: (data)=>data?.data?.posts,
    })


    function deletePost(postId){
axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`,{
  headers:{
    token:localStorage.getItem('userToken')
  }
}).then((res)=>{
  if(res.data.message=="success"){
    toast.success('Post deleted successfully');
    queryClient.invalidateQueries({
      queryKey:['userPosts']
    })
  }
}).catch((err)=>{
toast.error(err.response.data.error)
})
    }
    return (
     <>
     {data?.map((post)=>(
      <div  className=' max-w-md mx-auto bg-white shadow-md rounded-lg p-4 mt-6'>
        <Link key={post?.id} to={`/postdetails/${post?.id}`}>
<div className='flex justify-between items-center mb-4'>
  <div className='flex items-center gap-4'>
    <img src={post?.user.photo} alt=""  className='size-[35px]'/>
    <p>{post?.user.name}</p>
  </div>
  <div className='text-xs text-slate-700'>
    {post?.createdAt}
  </div>
</div>
      {post?.body && <h2 className='mb-4'>{post?.body}</h2>}
      {post?.image && <img src={post?.image} alt={post?.body}  className='w-full rounded-md ' />}
      {console.log(post)}
    </Link>
      <div>{post.comments.length>0&&(
      <Comment comment={post?.comments[0]}/>
    
      )}
      </div>

      <CreateCommentModal postId= {post?.id}/>
      <div className='flex justify-between p-2 '>
      <UpdatePost id={post?.id}/>
      <span onClick={()=>{deletePost(post.id)}} className="text-red-600  px-3 py-2 rounded-md hover:text-red-700">Delete Post</span>
      </div>
      </div>
    ))}
    </>
  )
}
