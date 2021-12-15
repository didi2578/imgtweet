import { dbService, storageService } from 'myBase'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import React, { useState } from 'react'

const ImgTweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState('')
  const [attachment, setAttachment] = useState('')

  const onSubmit = async (event) => {
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

  const onClearAttachment = () => setAttachment(null)
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="무슨 일이 일어나고 있나요?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFilechange} />
        <input type="submit" value="트윗" />
        {attachment && (
          <div>
            <img src={attachment} alt={attachment} width="60px" height="60px" />
            <button onClick={onClearAttachment}>취소</button>
          </div>
        )}
      </form>
    </>
  )
}

export default ImgTweetFactory
