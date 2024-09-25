import React, {useState} from 'react'
import {useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import { login as authLogin } from '../store/authSlice'
import authService from "../database/authService"
import {Button, Input, Logo} from "./index"
import {ProfileAvatar} from './index'

function ProfileUpdate() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user) // get current user info from the store
  console.log(user)
  const {register, handleSubmit} = useForm({
    defaultValues: {
      fullName: user.fullName || "",
      username: user.username || "",
    }
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [profileImage, setProfileImage] = useState(user?.profile)

  // Handle Profile Info Update
  const updateProfileInfo = async (data) => {
    setError("")
    setSuccess("")
    try {
      const session = await authService.updateAccountInfo({
        fullName: data.fullName,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      })

        if (session) {
            const user = session?.data?.user
            console.log(user)
            if(user) dispatch(authLogin(user));
            setSuccess("Profile updated successfully!")
        }
    } catch (error) {
      setError(error.message || "Profile update failed")
    }
  }

  // Handle Profile Image Update
  const handleProfileImageChange = async () => {
    setError("")
    setSuccess("")
    try {
    //   const formData = new FormData()
    //   formData.append("profile", profileImage) // Append the image file to formData
      const session = await authService.updateProfileImage({profile: profileImage})
      if (session) {
        const user = session?.data?.user
        console.log(user)
        setProfileImage(user.profile)
        if(user) dispatch(authLogin(user));

        setSuccess("Profile image updated successfully!")
        }
     
    } catch (error) {
      setError(error.message || "Failed to update profile image")
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <h2 className="text-center text-2xl font-bold leading-tight">Update Profile</h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {success && <p className="text-green-600 mt-8 text-center">{success}</p>}

        {/* Profile Update Form */}
        <form onSubmit={handleSubmit(updateProfileInfo)} className='mt-8'>
          <div className='space-y-5'>
            {/* Non-editable Username */}
            <Input
              label="Username: "
              type="text"
              value={user?.username || ""}
              readOnly  
            />

            {/* Editable Full Name */}
            <Input
              label="Full Name: "
              placeholder="Enter full name"
              type="text"
              value={user?.fullName || ""}
              {...register("fullName", {
                required: true,
              })}
            />

            {/* Password Inputs */}
            <Input
              label="Old Password: "
              type="password"
              placeholder="Enter your old password"
              {...register("oldPassword", {
                required: true,
              })}
            />

            <Input
              label="New Password: "
              type="password"
              placeholder="Enter your new password"
              {...register("newPassword", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full">Update Profile</Button>
          </div>
        </form>

        {/* Profile Image Upload */}
        <div className="mt-8">
          <h3 className="text-lg font-bold">Change Profile Image</h3>
          
          <form onSubmit={(e) => {
                    e.preventDefault();
                    handleProfileImageChange();
                }}
                className="space-y-4"
                encType="multipart/form-data"
                >
                {/* Flex container for image input and profile avatar */}
                <div className="flex items-center space-x-4">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])} // Set the selected image file
                    />
                    <ProfileAvatar width="100px" /> {/* Adjust width if necessary */}
                </div>

                {/* Button on the second line */}
                <Button type="submit" className="w-full">Upload Image</Button>
                </form>

        </div>
      </div>
    </div>
  )
}

export default ProfileUpdate
