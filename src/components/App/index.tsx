import * as React from "react";

import { ApolloConsumer } from "react-apollo";
import {
  CartOverlay,
  Footer,
  MainMenu,
  MainMenuNavOverlay,
  MetaConsumer,
  MobileNav,
  SearchOverlay
} from "..";
import CartProvider from "../CartProvider";
import { LoginOverlay } from "../LoginOverlay";
import { NotificationOverlay } from "../NotificationOverlay";
import { PasswordOverlay } from "../PasswordOverlay";
import { Routes } from "./routes";

import "./scss/index.scss";

const App: React.SFC<{}> = () => (
  <ApolloConsumer>
    {client => (
      <>
        <MetaConsumer />
        <CartProvider apolloClient={client}>
          <header>
            <MainMenu />
          </header>
          <Routes />
          <Footer />
          <CartOverlay />
          <LoginOverlay />
          <PasswordOverlay />
          <MobileNav />
          <MainMenuNavOverlay />
          <NotificationOverlay />
          <SearchOverlay />
        </CartProvider>
      </>
    )}
  </ApolloConsumer>
);

export default App;
