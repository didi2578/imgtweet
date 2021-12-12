import { authService } from 'myBase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

import React, { useState } from 'react'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      if (newAccount) {
        const data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        )
        console.log('새계정', data)
      } else {
        const data = await signInWithEmailAndPassword(
          authService,
          email,
          password
        )
        console.log('헌계정', data)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const toggleAccount = () => setNewAccount((prev) => !prev)
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event
    const provider = new GoogleAuthProvider()
    if (name === 'google') {
    }
    const data = await signInWithPopup(authService, provider)
    console.log('구글로그인', data)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
      </div>
    </div>
  )
}

export default Auth
