import { dbService } from 'myBase'
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import ImgTweet from 'components/ImgTweet'

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState('')
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    const q = query(
      collection(dbService, 'tweets'),
      orderBy('createdAt', 'desc')
    )
    onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setTweets(tweetArr)
    })
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    await addDoc(collection(dbService, 'tweets'), {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    })
    setTweet('')
  }
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setTweet(value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="무슨 일이 일어나고 있나요?"
          maxLength={120}
        />
        <input type="submit" value="트윗" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <ImgTweet
            key={tweet.id}
            userObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
