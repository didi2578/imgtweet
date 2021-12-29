import React, { useEffect, useState } from 'react'
import GlobalStyle from 'styles/GlobalStyle'
import AppRouter from 'components/Router'
import { authService } from 'myBase'

function App() {
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
          email: user.email.split('@')[0],
          updateProfile: (args) => user.updateProfile(args),
        })
      } else {
        setUserObj(null)
      }
      setInit(true)
    })
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser

    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      email: user.email.split('@')[0],
      updateProfile: (args) => user.updateProfile(args),
    })
  }

  return (
    <>
      <GlobalStyle />
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        'Initializing,,,'
      )}
    </>
  )
}

export default App
