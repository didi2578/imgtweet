import React, { useCallback, useEffect, useState } from 'react'
import { dbService } from 'myBase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import ImgTweet from 'components/ImgTweet'

const MyTweets = ({ userObj }) => {
  const [myTweets, setMyTweets] = useState([])
  const getMyTweets = useCallback(async () => {
    const q = query(
      collection(dbService, 'tweets'),
      where('creatorId', '==', userObj.uid),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)

    const tweetArr = querySnapshot.docs.map((doc) => doc.data())
    setMyTweets(tweetArr)
  }, [userObj])

  useEffect(() => {
    getMyTweets()
  }, [getMyTweets])

  return (
    <div>
      {myTweets.map((myTweet, index) => (
        <ImgTweet
          key={index}
          userObj={myTweet}
          isOwner={myTweet.creatorId === userObj.uid}
        />
      ))}
    </div>
  )
}

export default MyTweets
