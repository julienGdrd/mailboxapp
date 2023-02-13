import "../styles/globals.css";
import Head from "next/head";

import MainHeader from "../components/MainHeader";
import LeftPanel from "../components/LeftPanel";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import mailDisplayer from "../reducers/mailDisplayer";
import allMails from "../reducers/allMails";
import activeTabs from "../reducers/leftTabs";

const store = configureStore({
  reducer: { mailDisplayer, allMails, activeTabs },
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
