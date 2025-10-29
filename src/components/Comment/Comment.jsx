import React from 'react'
import style from "./Comment.module.css"
import UpdateComment from './../UpdateComment/UpdateComment';
import DeleteComment from './../DeleteComment/DeleteComment';

export default function Comment({ comment }) {
console.log(comment)
  let { commentCreator, createdAt, content ,_id } = comment

  return (
    <div className=' w-[90%] mx-auto  rounded-md border-2 text-white my-4 p-3 shadow-xl bg-fuchsia-950'>
      <div className=' flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <img src={commentCreator?.photo} alt="" className='size-[35px]' />
          <p className=''>{commentCreator?.name}</p>
        </div>
        <span className=' text-xs'>{createdAt}</span>
      </div>
      <div className="content px-12">
        Comment :{content}
      </div>
      <div className='my-3 p-4  flex gap-3'>
        
        <UpdateComment id={_id}/>
        <DeleteComment id={_id}/>
      </div>
    </div>
  )
}
