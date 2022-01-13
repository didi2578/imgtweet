import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUserCircle, faHome } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const NavBar = ({ userObj }) => {
  const location = useLocation()
  console.log(userObj)
  if (location.pathname === '/tweetfactory') {
    return null
  }

  return (
    <nav className="container" style={{ backgroundColor: 'orange' }}>
      <ul
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'orange',
          height: 60,
          width: '50%',
        }}
      >
        <Imgli>
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
            {userObj.photoURL ? (
              <img src={userObj.photoURL} alt={userObj.nickName} />
            ) : (
              <FontAwesomeIcon icon={faUserCircle} size="3x" />
            )}
            {/* <span style={{ marginTop: 10 }}>
              {userObj.displayName
                ? `${userObj.displayName}의 Profile`
                : 'Profile'}
            </span> */}
          </Link>
        </Imgli>
        <li>
          <Link to="/">
            <FontAwesomeIcon
              icon={faHome}
              size="2x"
              style={{ color: 'white' }}
            />
          </Link>
        </li>
      </ul>
    </nav>
  )
}
const Imgli = styled.li`
  /* display: flex;
  align-items: top;
  margin: 20px 5px;
  width: 100%; */
  img {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`
export default NavBar
