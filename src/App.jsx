import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import UserContextProvider from './Context/UserContext';
import PostContextProvider from './Context/PostContext';
import ProtectedRout from './components/ProtectedRout/ProtectedRout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/production';
import PostDetails from './components/PostDetails/PostDetails';
import {Toaster} from 'react-hot-toast'

const query =new QueryClient();



const x = createBrowserRouter([

  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element:<ProtectedRout><Home /></ProtectedRout>  },
      { path: "profile", element: <ProtectedRout><Profile /></ProtectedRout>  },
      { path: "postdetails/:id", element: <ProtectedRout><PostDetails /></ProtectedRout>  },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ]
  },


]
)

function App() {
  return (
    <>
    <UserContextProvider>
      <PostContextProvider>
        <QueryClientProvider client={query}>
          <RouterProvider router={x} />
          <Toaster/>
          <ReactQueryDevtools/>
        </QueryClientProvider>
      </PostContextProvider>
    </UserContextProvider>
  
    </>
  )
}

export default App
