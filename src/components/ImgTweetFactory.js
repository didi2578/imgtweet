import { dbService, storageService } from 'myBase'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const ImgTweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState('')
  const [attachment, setAttachment] = useState('')

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
        <InputContainer>
          <FactoryInput
            value={tweet}
            onChange={onChange}
            type="text"
            placeholder="무슨 일이 일어나고 있나요?"
            maxLength={120}
          />
          <FactoryArrow type="submit" value="트윗" />
        </InputContainer>
        <label
          htmlFor="attach-file"
          style={{ color: '#04aaff', cursor: 'pointer' }}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
  width: 100%;
`
const FactoryInput = styled.input`
  flex-grow: 1;
  height: 40px;
  padding: 0px 20px;
  /* color: white; */
  border: 1px solid #04aaff;
  border-radius: 20px;
  font-weight: 500;
  font-size: 12px;
`
const FactoryArrow = styled.input`
  position: absolute;
  right: 0;
  background-color: #04aaff;
  height: 40px;
  width: 40px;
  padding: 10px 0px;
  text-align: center;
  border-radius: 20px;
  color: white;
`
export default ImgTweetFactory
