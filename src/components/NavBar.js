import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/Profile">{userObj.displayName} Profile</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
