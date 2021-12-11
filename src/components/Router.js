import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from 'routes/Home'
import Auth from 'routes/Auth'

const AppRouter = ({ isLoggedIn }) => {
  return (
    <div>
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact path="/" element={<Home />} />
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