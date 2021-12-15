import { authService, dbService } from 'myBase'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import React, { useCallback, useEffect, useState } from 'react'

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

  let navigate = useNavigate()
  const onLogOutClick = () => {
    authService.signOut()
    navigate('/')
  }
  const getMyTweets = useCallback(async () => {
    const q = query(
      collection(dbService, 'tweets'),
      where('creatorId', '==', userObj.uid),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)
    console.log(
      '왜안나옴..?',
      querySnapshot.docs.map((doc) => doc.data())
    )
  }, [userObj])

  useEffect(() => {
    getMyTweets()
  }, [getMyTweets])

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
