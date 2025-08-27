import React from 'react'
import style from "./Comment.module.css"
import UpdateComment from './../UpdateComment/UpdateComment';
import DeleteComment from './../DeleteComment/DeleteComment';

export default function Comment({ comment }) {
console.log(comment)
  let { commentCreator, createdAt, content ,_id } = comment

  return (
    <div className=' w-full rounded-md border-2 my-2 p-3 border-slate-900 bg-slate-500 text-white'>
      <div className=' flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <img src={commentCreator?.photo} alt="" className='size-[35px]' />
          <p>{commentCreator?.name}</p>
        </div>
        <span className='text-slate-300 text-xs'>{createdAt}</span>
      </div>
      <div className="content px-12">
        Comment :{content}
      </div>
      <div className='my-3 p-4 bg-slate-300 flex gap-3'>
        
        <UpdateComment id={_id}/>
        <DeleteComment id={_id}/>
      </div>
    </div>
  )
}
