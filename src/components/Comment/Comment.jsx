import React from 'react'
import style from "./Comment.module.css"
import UpdateComment from './../UpdateComment/UpdateComment';
import DeleteComment from './../DeleteComment/DeleteComment';

export default function Comment({ comment }) {
console.log(comment)
  let { commentCreator, createdAt, content ,_id } = comment

  return (
    <div className=' w-[90%] mx-auto  rounded-md border-2 border-fuchsia-900 my-4 p-3 shadow-xl bg-gray-200 dark:bg-gray-900'>
      <div className=' flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <img src={commentCreator?.photo} alt="" className='size-[35px]' />
          <p className=''>{commentCreator?.name}</p>
        </div>
        <span className=' text-xs text-fuchsia-900 dark:text-white'>{createdAt}</span>
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
