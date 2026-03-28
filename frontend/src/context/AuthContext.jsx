import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth, googleProvider, firebaseEnabled } from '../firebase/config.js'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!firebaseEnabled || !auth) {
      setLoading(false)
      return
    }
    setPersistence(auth, browserLocalPersistence)
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      login: async (email, password) => {
        if (!firebaseEnabled || !auth) throw new Error('Authentication unavailable')
        const res = await signInWithEmailAndPassword(auth, email, password)
        return res.user
      },
      signup: async (email, password) => {
        if (!firebaseEnabled || !auth) throw new Error('Authentication unavailable')
        const res = await createUserWithEmailAndPassword(auth, email, password)
        return res.user
      },
      loginWithGoogle: async () => {
        if (!firebaseEnabled || !auth || !googleProvider) throw new Error('Authentication unavailable')
        const res = await signInWithPopup(auth, googleProvider)
        return res.user
      },
      logout: async () => {
        if (!firebaseEnabled || !auth) return
        await signOut(auth)
      }
    }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
