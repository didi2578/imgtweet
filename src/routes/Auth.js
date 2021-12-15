import { authService } from 'myBase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import AuthForm from 'components/AuthForm'

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
    <>
      <AuthForm />
      <>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
      </>
    </>
  )
}

export default Auth
