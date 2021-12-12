import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from 'routes/Home'
import Auth from 'routes/Auth'
import Profile from 'routes/Profile'
import NavBar from 'components/NavBar'

const AppRouter = ({ isLoggedIn }) => {
  return (
    <div>
      <Router>
        {isLoggedIn && <NavBar />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/profile" element={<Profile />} />
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
