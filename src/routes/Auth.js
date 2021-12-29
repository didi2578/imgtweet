import { authService } from 'myBase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import AuthForm from 'components/AuthForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons'

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
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#04AAFF'}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button name="google" onClick={onSocialClick} className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
      </div>
    </div>
  )
}

export default Auth
