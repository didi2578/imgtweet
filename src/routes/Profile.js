import { authService } from 'myBase'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import React, { useState } from 'react'

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

  let navigate = useNavigate()
  const onLogOutClick = () => {
    authService.signOut()
    navigate('/')
  }

  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
  }

  const onSubmit = async (event) => {
    const user = authService.currentUser
    event.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(user, { displayName: newDisplayName })
    }
    refreshUser()
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" value={newDisplayName} />
        <input type="submit" value="수정" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}

export default Profile
