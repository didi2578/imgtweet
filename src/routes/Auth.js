import { authService } from 'myBase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import AuthForm from 'components/AuthForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons'
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
        icon={faTwitter}
        color={'#04AAFF'}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <AuthBtns>
        <AuthBtn name="google" onClick={onSocialClick}>
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
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
  border: none;
  padding: 10px 0px;
  font-size: 12px;
  text-align: center;
  width: 100%;
  background: white;
  cursor: pointer;
`
export default Auth
