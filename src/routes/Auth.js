import { authService } from 'myBase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import AuthForm from 'components/AuthForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event
    const provider = new GoogleAuthProvider()
    if (name === 'google') {
    }
    await signInWithPopup(authService, provider)
  }

  return (
    <AuthContainer>
      <FontAwesomeIcon
        icon={faHome}
        color={'orange'}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <AuthBtns>
        <AuthBtn name="google" onClick={onSocialClick}>
          <span>Continue with Google</span>
          <FontAwesomeIcon icon={faGoogle} color={'orange'} />
        </AuthBtn>
      </AuthBtns>
    </AuthContainer>
  )
}
const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  width: 320px;
`

const AuthBtns = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const AuthBtn = styled.button`
  cursor: pointer;
  border-radius: 20px;
  border: 1px solid orange;
  padding: 10px 0px;
  font-size: 12px;
  text-align: center;
  width: 100%;
  color: orange;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    padding-right: 5px;
  }
`
export default Auth
