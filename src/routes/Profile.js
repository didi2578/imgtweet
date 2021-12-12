import { authService } from 'myBase'
import { useNavigate } from 'react-router-dom'
import React from 'react'

const Profile = () => {
  let navigate = useNavigate()
  const onLogOutClick = () => {
    authService.signOut()
    navigate('/')
  }
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}

export default Profile
