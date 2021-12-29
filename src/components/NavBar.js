import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const NavBar = ({ userObj }) => {
  return (
    <nav className="container">
      <ul
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 50,
          marginBottom: 20,
          alignItems: 'center',
          width: '54%',
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
            <FontAwesomeIcon icon={faUser} color={'#04AAFF'} size="2x" />
            {/* <span style={{ marginTop: 10 }}>
              {userObj.displayName
                ? `${userObj.displayName}의 Profile`
                : 'Profile'}
            </span> */}
          </Link>
        </li>
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size="2x" />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
