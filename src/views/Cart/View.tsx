import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import { Loader } from "../../components";
import { CartContext } from "../../components/CartProvider/context";
import { TypedGetCheckoutQuery } from "../../components/CheckoutApp/queries";
import { getCheckout_checkout } from "../../components/CheckoutApp/types/getCheckout";
import { OverlayContext } from "../../components/Overlay/context";
import { maybe } from "../../core/utils";
import Page from "./Page";

const canDisplay = (checkout: getCheckout_checkout) =>
  maybe(() => checkout.lines && checkout.subtotalPrice);

const View: React.SFC<RouteComponentProps<{ token }>> = ({
  match: {
    params: { token = "" }
  }
}) => {
  return (
    <div className="container cart-page">
      <h1 className="checkout__header cart-page__header">Shopping bag</h1>
      <TypedGetCheckoutQuery loaderFull errorPolicy="all" variables={{ token }}>
        {({ data: { checkout } }) => {
          if (canDisplay(checkout)) {
            return (
              <CartContext.Consumer>
                {cart => (
                  <OverlayContext.Consumer>
                    {overlay => (
                      <Page overlay={overlay} checkout={checkout} cart={cart} />
                    )}
                  </OverlayContext.Consumer>
                )}
              </CartContext.Consumer>
            );
          }
          return <Loader full />;
        }}
      </TypedGetCheckoutQuery>
    </div>
  );
};

export default View;
