import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function DeleteComment({ id }) {
  const queryClient = useQueryClient();

  async function handleDeleteComment() {
  

    try {
      const { data } = await axios.delete(`https://linked-posts.routemisr.com/comments/${id}`, {
        headers: {
          token: localStorage.getItem("userToken")
        }
      });

      if (data.message === "success") {
        toast.success('Comment deleted successfully');
        queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
        queryClient.invalidateQueries({ queryKey: ["userPosts"] });

      } else {
        toast.error("Failed to delete comment.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err?.response?.data?.message || "Unauthorized or unexpected error.");
    }
  }

  return (
    <button
      onClick={handleDeleteComment}
      className='bg-red-500 py-0 rounded-md w-full cursor-pointer'
    >
      Delete Comment
    </button>
  );
}
