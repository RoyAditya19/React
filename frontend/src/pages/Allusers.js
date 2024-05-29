import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import {MdModeEdit} from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const Allusers = () => {
  const[allUser, setallUser] = useState([])
  const[openUpdateRole, setOpenUpdateRole] = useState(false)
  const[updateUserData, setUpdateUserData] = useState({
    name: "",
    email: "",
    role: "",
    _id:""
  })

  const fetchAllUsers = async()=>
    {
      const fetchData = await fetch(SummaryApi.allUser.url,{
        method: SummaryApi.allUser.method,
        credentials: 'include'
    })

    const dataResponse = await fetchData.json()

    if(dataResponse.success)
      {
        setallUser(dataResponse.data)
      }
    
      if(dataResponse.error)
        {
          toast.error(dataResponse.message)
        }

    }
    

    useEffect(() => {
      
        fetchAllUsers()
    }, [])
    
  return (
    <div className='bg-white pb-4'>
        <table className='w-full userTable'>
          <thead>
              <tr className='bg-black text-white'>
                  <th>Sr.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created Date</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
            {
                allUser.map((el,index)=>
                {
                  return(
                    <tr >
                        <td>{index+1}</td>
                        <td>{el?.name}</td>
                        <td>{el?.email}</td>
                        <td>{el?.role}</td>
                        <td>{moment(el?.createdAt).format('ll')}</td>
                        <td>
                          <button className='bg-green-50 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-white' 
                          onClick={()=>{
                          setUpdateUserData(el)
                          setOpenUpdateRole(true)
                          }}>
                            <MdModeEdit/>
                          </button>
                        </td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>

        {
          openUpdateRole && ( <ChangeUserRole 
          onClose={()=>setOpenUpdateRole(false)}
          name={updateUserData.name}
          email={updateUserData.email}
          role={updateUserData.role}
          userId={updateUserData._id}
          callFunc={fetchAllUsers}
          /> )
        }

    </div>
  )
}

export default Allusers
