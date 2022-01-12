import { dbService, storageService } from 'myBase'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlus,
  faTimes,
  faUserCircle,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const ImgTweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState('')
  const [attachment, setAttachment] = useState('')
  let navigate = useNavigate()
  console.log(userObj)
  const onSubmit = async (event) => {
    if (tweet === '') {
      return
    }
    event.preventDefault()
    let fileURL = ''
    if (attachment !== '') {
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
      const uploadFile = await uploadString(fileRef, attachment, 'data_url')
      fileURL = await getDownloadURL(uploadFile.ref)
    }
    const tweetPost = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      nickName: userObj.displayName,
      profilePhoto: userObj.photoURL,
      email: userObj.email,
      fileURL,
    }
    await addDoc(collection(dbService, 'tweets'), tweetPost)
    setTweet('')
    setAttachment('')
    navigate('/')
  }

  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setTweet(value)
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
    <>
      <FactoryForm onSubmit={onSubmit}>
        <FactoryTweet>
          <Link to="/">
            <span>
              <FontAwesomeIcon icon={faArrowLeft} />
            </span>
          </Link>
          <input type="submit" value="트윗" />
        </FactoryTweet>
        <InputContainer>
          {userObj.photoURL ? (
            <img src={userObj.photoURL} alt={userObj.nickName} />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} size="3x" />
          )}
          <FactoryInput
            value={tweet}
            onChange={onChange}
            type="text"
            placeholder="무슨 일이 일어나고 있나요?"
            maxLength={120}
          />
        </InputContainer>
        <label
          htmlFor="attach-file"
          style={{ color: 'orange', cursor: 'pointer' }}
        >
          <span style={{ marginRight: '10px', fontSize: '12px' }}>
            Add photos
          </span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onFilechange}
          id="attach-file"
          style={{
            opacity: 0,
          }}
        />
        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              alt={attachment}
              style={{
                backgroundImage: attachment,
              }}
            />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>취소</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </FactoryForm>
    </>
  )
}
const FactoryForm = styled.form`
  padding: 10px;
  width: 100%;
`
const InputContainer = styled.div`
  display: flex;
  align-items: top;
  margin: 10px 0;
  width: 100%;
  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`
const FactoryInput = styled.textarea`
  flex-grow: 1;
  height: 150px;
  border: none;
  padding: 10px 0;
  font-weight: 500;
  font-size: 12px;
  :focus {
    outline: none;
  }
`
const FactoryTweet = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    padding: 10px;
    cursor: pointer;
  }
  input {
    background-color: orange;
    height: 40px;
    width: 60px;
    padding: 10px 0px;
    text-align: center;
    border-radius: 20px;
    color: white;
  }
`
export default ImgTweetFactory
