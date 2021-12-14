import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from 'routes/Home'
import Auth from 'routes/Auth'
import Profile from 'routes/Profile'
import NavBar from 'components/NavBar'

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <div>
      <Router>
        {isLoggedIn && <NavBar />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact path="/" element={<Home userObj={userObj} />} />
              <Route
                exact
                path="/profile"
                element={<Profile userObj={userObj} />}
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
