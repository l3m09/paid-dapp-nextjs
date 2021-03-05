import { useMemo } from 'react'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

let store

function initStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  )
}

export const initializeStore = (preloadedState) => {
  let privateStore = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    privateStore = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return privateStore
  // Create the store once in the client
  if (!store) store = privateStore

  return privateStore
}

export function useStore(initialState) {
  const newStore = useMemo(() => initializeStore(initialState), [initialState])
  return newStore
}
