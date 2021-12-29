import { dbService } from 'myBase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import ImgTweet from 'components/ImgTweet'
import ImgTweetFactory from 'components/ImgTweetFactory'

const Home = ({ userObj }) => {
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

  return (
    <div className="container">
      <ImgTweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
