import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../database/authService'
import {login as authLogin} from '../store/authSlice' 

export default function AuthLayout({ children }) {
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)
    const dispatch = useDispatch()

    const checkSession = async () => {
        const session = await authService.getCurrentUser()
        const user = session?.data?.user
        console.log('In CheckSession ; ',user)
        return user
    }

    useEffect(() => {
        const authenticate = async () => {
            if (!authStatus) {
                const user = await checkSession()
                if (!user){
                    navigate("/login")
                }else{
                    console.log("Authenticated...")
                    dispatch(authLogin(user))
                }
            }
        }        
        authenticate() 
    }, [authStatus, navigate, dispatch])

    return <>{children}</>
}
