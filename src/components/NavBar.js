import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const NavBar = ({ userObj }) => {
  const location = useLocation()
  if (location.pathname === '/tweetfactory') {
    return null
  }

  return (
    <nav className="container">
      <ul
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 20,
          alignItems: 'center',
          backgroundColor: 'orange',
          height: 60,
        }}
      >
        <li>
          <Link
            to="/profile"
            style={{
              marginLeft: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: 12,
            }}
          >
            <FontAwesomeIcon icon={faUser} size="2x" />
            {/* <span style={{ marginTop: 10 }}>
              {userObj.displayName
                ? `${userObj.displayName}의 Profile`
                : 'Profile'}
            </span> */}
          </Link>
        </li>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
