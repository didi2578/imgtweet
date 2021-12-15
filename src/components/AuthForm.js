import React, { useState } from 'react'
import { authService } from 'myBase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const AuthForm = () => {
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
  return (
    <>
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
    </>
  )
}

export default AuthForm
