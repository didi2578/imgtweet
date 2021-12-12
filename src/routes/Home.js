import { dbService } from 'myBase'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [tweet, setTweet] = useState('')
  const [tweets, setTweets] = useState([])
  const getTweets = async () => {
    const dbTweets = await getDocs(collection(dbService, 'tweets'))
    dbTweets.forEach((doc) => {
      const tweetObject = {
        ...doc.data(),
        id: doc.id,
      }
      setTweets((prev) => [tweetObject, ...prev])
    })
  }

  useEffect(() => {
    getTweets()
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    await addDoc(collection(dbService, 'tweets'), {
      tweet,
      createdAt: Date.now(),
    })
    setTweet('')
  }
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setTweet(value)
  }
  console.log(tweets)
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
          <div key={tweet.id}>
            <h4>{tweet.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
