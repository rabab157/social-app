import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { useForm } from 'react-hook-form'
import  z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../../Context/UserContext';




export default function Login() {
  const navigate =useNavigate();
  const [apiError ,setapiError]=useState("");
  const [isLoading ,setisLoading]=useState(false);
  let {userLogin ,setuserLogin}=useContext(UserContext)
  
  const schema = z.object({
    email: z.email("invalid email"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "must includes 1 capital char "),
   
  });



  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver : zodResolver(schema)
  });

  function handleLogin(values) {
    setisLoading(true);
    axios.post("https://linked-posts.routemisr.com/users/signin",values).then((res)=>{
      if(res.data.message=="success"){
       setisLoading(false);
       localStorage.setItem("userToken", res.data.token);
       setuserLogin(res.data.token);
      navigate("/Home");

    }})
    .catch((err)=>{
      setapiError(err.response.data.error)
    setisLoading(false);
  });
  }

  let { register, handleSubmit ,formState} = form;
  return <>


    <form onSubmit={handleSubmit(handleLogin)}
      className="max-w-md mx-auto my-12">
        {apiError && (
          <h1 className='text-center bg-red-500 text-white p-2 my-2 font-bold rounded-2'>{apiError}</h1>
        )}
      
      <div className="relative z-0 w-full mb-5 group">
        <input type="email" {...register("email")} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
      {formState.errors.email && formState.touchedFields.email ?<p className='text-red-500 font-semibold text-center my-2'>{formState.errors.email.message}</p>:""}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input type="password" {...register("password")} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
       {formState.errors.password && formState.touchedFields.password ?<p className='text-red-500 font-semibold text-center my-2'>{formState.errors.password.message}</p>:""}
      </div>
      

      <button disabled={isLoading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {isLoading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : "Login"}
      </button>
   
    </form>

  </>
}
