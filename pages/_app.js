import "../styles/globals.css";
import Head from "next/head";

import MainHeader from "../components/MainHeader";
import LeftPanel from "../components/LeftPanel";


import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import mailDisplayer from "../reducers/mailDisplayer";

const store = configureStore({
  reducer: { mailDisplayer },
});
function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>MailBox</title>
        </Head>
        <MainHeader />
        <div className="panel">
          <LeftPanel />
          <Component {...pageProps} />
        </div>
        
      </Provider>
    </>
  );
}

export default App;
