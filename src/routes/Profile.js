import { authService } from 'myBase'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faTimes,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import MyTweets from './MyTweets'

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const [attachment, setAttachment] = useState('')
  let navigate = useNavigate()
  const onLogOutClick = () => {
    authService.signOut()
    navigate('/')
  }
  console.log(userObj)

  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const user = authService.currentUser
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(user, {
        displayName: newDisplayName,
      })
    } else if (userObj.photoURL !== attachment) {
      await updateProfile(user, {
        photoURL: attachment,
      })
    }

    refreshUser()
  }
  const onFilechange = (event) => {
    const {
      target: { files },
    } = event
    const theFile = files[0]
    const reader = new FileReader()
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }
  const onClearAttachment = () => setAttachment('')
  return (
    <div className="container">
      <ProfileForm onSubmit={onSubmit}>
        {attachment ? (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              alt={userObj.displayName}
              style={{
                backgroundImage: attachment,
              }}
            />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>취소</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        ) : (
          <ProfileImg>
            {userObj.photoURL ? (
              <img
                src={userObj.photoURL}
                alt={userObj.displayName}
                className="profileImg"
              />
            ) : (
              <FontAwesomeIcon icon={faUserCircle} size="3x" color={'orange'} />
            )}
            <p>{userObj.displayName}</p>
            <span style={{ color: 'gray', fontWeight: '300', paddingTop: 5 }}>
              @{userObj.email}
            </span>
          </ProfileImg>
        )}
        {/* <label htmlFor="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label> */}
        <input
          type="file"
          accept="image/*"
          onChange={onFilechange}
          id="attach-file"
          style={{
            opacity: 0,
          }}
        />
        <input
          onChange={onChange}
          type="text"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="수정"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
        <span
          className="formBtn cancelBtn"
          onClick={onLogOutClick}
          style={{
            marginTop: 10,
          }}
        >
          로그아웃
        </span>
      </ProfileForm>
      <MyTweets userObj={userObj} />
    </div>
  )
}
const ProfileForm = styled.form`
  padding: 20px;
  width: 100%;

  display: flex;
  flex-direction: column;
`
const ProfileImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;

  p {
    margin-top: 10px;
  }
`
export default Profile
