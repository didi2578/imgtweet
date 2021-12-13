import React, { useState } from 'react'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { dbService } from 'myBase'

const ImgTweet = ({ userObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newTweet, setNewTweet] = useState(userObj.text)
  const onDeleteClick = async () => {
    if (window.confirm('삭제 하시겠습니까?')) {
      await deleteDoc(doc(dbService, `tweets/${userObj.id}`))
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
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="문구 입력..."
              value={newTweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="완료" />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{userObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={toggleEditing}>수정</button>
              <button onClick={onDeleteClick}>삭제</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default ImgTweet
