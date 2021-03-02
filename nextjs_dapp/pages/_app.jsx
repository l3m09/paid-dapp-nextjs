import React from 'react'
import { Provider } from 'react-redux';

import PrivateLayout from '../components/Layout/PrivateLayout'

import { useStore } from '../redux/store'
import '../sass/styles.scss'

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps, router }) {
  console.log(router)
  // eslint-disable-next-line react/prop-types
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      {
        router.pathname === '/' ?
         <Component {...pageProps} /> :
         <PrivateLayout> 
            <Component {...pageProps} /> :
         </PrivateLayout>
      }
    </Provider>
  )
}

export default MyApp;
