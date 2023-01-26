import '../styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import mailDisplayer from '../reducers/mailDisplayer';

const store = configureStore({
 reducer: { mailDisplayer },
});
function App({ Component, pageProps }) {
  return (
    <>
    <Provider store={store}>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
    </>
  );
}

export default App;
