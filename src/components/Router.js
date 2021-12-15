import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from 'routes/Home'
import Auth from 'routes/Auth'
import Profile from 'routes/Profile'
import NavBar from 'components/NavBar'
import MyTweets from 'routes/MyTweets'

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <div>
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
    </div>
  )
}

export default AppRouter
