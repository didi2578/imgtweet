import { dbService, storageService } from 'myBase'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faUserCircle,
  faArrowLeft,
  faImage,
} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const ImgTweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState('')
  const [attachment, setAttachment] = useState('')
  let navigate = useNavigate()

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
        <Link to="/">
          <span style={{ padding: 10, cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
        </Link>

        <InputContainer>
          {userObj.photoURL ? (
            <img src={userObj.photoURL} alt={userObj.nickName} />
          ) : (
            <FontAwesomeIcon
              icon={faUserCircle}
              size="3x"
              color={'orange'}
              style={{ paddingRight: 5 }}
            />
          )}
          <FactoryInput
            value={tweet}
            onChange={onChange}
            type="text"
            placeholder="무슨 일이 일어나고 있나요?"
            maxLength={120}
          />
        </InputContainer>
        <FactoryTweet>
          <label
            htmlFor="attach-file"
            style={{ color: 'orange', cursor: 'pointer' }}
          >
            <FontAwesomeIcon icon={faImage} size="2x" />
          </label>
          <input type="submit" value="발행" />
        </FactoryTweet>
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
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </div>
          </div>
        )}
      </FactoryForm>
    </>
  )
}
const FactoryForm = styled.form`
  padding: 10px;
  max-width: 320px;
`
const InputContainer = styled.div`
  display: flex;
  align-items: top;
  margin: 20px 5px;
  width: 100%;
  img {
    border-radius: 50%;
    width: 3em;
    height: 3em;
    margin-right: 10px;
  }
`
const FactoryInput = styled.textarea`
  flex-grow: 1;
  height: 100px;
  border: none;
  padding: 10px 0;
  font-weight: 500;
  font-size: 12px;
  overflow-y: hidden;
  resize: none;
  :focus {
    outline: none;
  }
`
const FactoryTweet = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  input {
    background-color: orange;
    height: 35px;
    width: 60px;
    padding: 10px 0px;
    text-align: center;
    border-radius: 20px;
    color: white;
  }
`
export default ImgTweetFactory
