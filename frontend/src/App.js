import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import SummaryApi from './common';
import { useEffect } from 'react';
import Context from "./context";
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()

  const fetchUserDetails = async()=>
    {
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method: SummaryApi.current_user.method,
        credentials: 'include'                          //this particular line is responsible for sending the cookies stored in the browser. so that's why when the "/user-details" method gets clicked cookies and all required credentials are sent along with the request and after that authtoken is also send in the index.js of backend/routes folder
        })

        const dataApi = await dataResponse.json()
        if(dataApi.success)
          {
              dispatch(setUserDetails(dataApi.data))      //this is sending the details received from the backend to the userslice, setuserdetails method
          }
        
    }

    useEffect(()=>
    {
      fetchUserDetails()
    })
  return (
    <>

    <Context.Provider value = {{
      fetchUserDetails //user details being fetched
    }}>
    <ToastContainer/>
    <Header/>
    <main className='min-h-[calc(100vh-120px)] pt-16'>
    <Outlet/>
    </main>
    <Footer/>
    </Context.Provider>
    </>
  );
}

export default App;
