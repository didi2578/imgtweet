import React, { useState } from 'react'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { dbService, storageService } from 'myBase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faPencilAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const ImgTweet = ({ userObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newTweet, setNewTweet] = useState(userObj.text)
  console.log(userObj)
  const onDeleteClick = async () => {
    if (window.confirm('삭제 하시겠습니까?')) {
      await deleteDoc(doc(dbService, `tweets/${userObj.id}`))
      await deleteObject(ref(storageService, userObj.fileURL))
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    await updateDoc(doc(dbService, `tweets/${userObj.id}`), {
      text: newTweet,
    })
    setEditing(false)
  }
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setNewTweet(value)
  }

  const toggleEditing = () => setEditing((prev) => !prev)

  return (
    <Nweet>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="문구 입력..."
              value={newTweet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="완료" className="formBtn" />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            취소
          </button>
        </>
      ) : (
        <>
          <div className="profile">
            {userObj.profilePhoto ? (
              <img src={userObj.profilePhoto} alt={userObj.nickName} />
            ) : (
              <FontAwesomeIcon icon={faUserCircle} size="3x" color={'orange'} />
            )}
            <div className="text">
              <h4 style={{ fontSize: '15px', fontWeight: 'bold' }}>
                {userObj.nickName}
                <span style={{ color: 'gray', fontWeight: '300' }}>
                  @{userObj.email}
                </span>
              </h4>
              <h4 style={{ paddingTop: '10px' }}>{userObj.text}</h4>
            </div>
          </div>
          {userObj.fileURL && (
            <img
              src={userObj.fileURL}
              alt={userObj.fileURL}
              className="tweetImg"
            />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </Nweet>
  )
}
const Nweet = styled.div`
  margin-bottom: 20px;
  background-color: white;
  width: 100%;
  max-width: 320px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.8);
  h4 {
    font-size: 14px;
    span {
      margin-left: 5px;
    }
  }
  .profile {
    display: flex;
    align-items: flex-start;
    img {
      border-radius: 50%;
      width: 3em;
      height: 3em;
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
`
export default ImgTweet
