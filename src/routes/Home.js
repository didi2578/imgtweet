import { dbService, authService } from 'myBase'
import { Link } from 'react-router-dom'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import ImgTweet from 'components/ImgTweet'
import ImgTweetFactory from 'components/ImgTweetFactory'
import styled from 'styled-components'

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    const q = query(
      collection(dbService, 'tweets'),
      orderBy('createdAt', 'desc')
    )
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setTweets(tweetArr)
    })

    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe()
      }
    })
  }, [])

  return (
    <div className="container">
      {/* <ImgTweetFactory userObj={userObj} /> */}
      <div>
        {tweets.map((tweet) => (
          <ImgTweet
            key={tweet.id}
            userObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
      <Button>
        <Link to="/tweetfactory">+</Link>
      </Button>
    </div>
  )
}
const Button = styled.button`
  font-size: 25px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: orange;
  border: none;
  color: white;
  position: fixed;
  bottom: 10px;
  right: 10px;
`
export default Home
