import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../database/authService'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = async () => {
        await authService.logout()
        dispatch(logout())
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 mr-2 hover:bg-[#58353a]  rounded-full text-[#f55d05] font-bold'
    onClick={logoutHandler} 
    >Logout</button>
  )
}

export default LogoutBtn