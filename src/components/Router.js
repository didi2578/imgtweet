import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from 'routes/Home'
import Auth from 'routes/Auth'
import Profile from 'routes/Profile'
import NavBar from 'components/NavBar'
import MyTweets from 'routes/MyTweets'
import styled from 'styled-components'

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <StyledDiv>
      <Router>
        {isLoggedIn && <NavBar userObj={userObj} />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact path="/" element={<Home userObj={userObj} />} />
              <Route
                exact
                path="/profile"
                element={
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                }
              />
              <Route
                exact
                path="/mytweets"
                element={<MyTweets userObj={userObj} />}
              />
            </>
          ) : (
            <Route exact path="/" element={<Auth />} />
          )}
        </Routes>
      </Router>
    </StyledDiv>
  )
}
const StyledDiv = styled.div`
  max-width: 890;
  width: 100%;
  margin: 0 auto;
  margin-top: 80;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`
export default AppRouter
