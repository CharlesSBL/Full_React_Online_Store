import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link } from "react-router-dom";

import styles from "./PayPalBtn.module.scss";

import { SetStateAction, useState } from "react";
import { resolve } from "path";

const Paypal = (props: { product: any }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState("");

  const { product } = props;

  const handleApprove = (orderId: any) => {
    // call backend func to fulfill order

    // if response is success
    setPaidFor(true);

    // Refresh user acc or subscription status

    // if returns response the error
  };
  if (paidFor) {
    // show success message, modal or redirect to the success page
    alert("thank you for your purchase!");
  }

  if (error) {
    // display error message, modal or redirect user to the error page
    alert(error);
  }
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AfLy_rVNoIrR9vwOT9ly95TsYNtVvwp099uy0tlcy3sI1ObtWb80dy-RDe_9nohwpdF8rq98bK2Jia7r",
      }}
    >
      <div className={styles.root}>
        <p>Choose The Payment Method</p>
        <PayPalButtons
          onClick={(data, actions) => {
            // validate on button click, client or server side
            const hasAlreadyBoughtPizzas = false;

            if (hasAlreadyBoughtPizzas) {
              setError("You already bought pizzas");

              return actions.reject();
            } else {
              return actions.resolve();
              // after this it's going to create order
            }
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: product.description,
                  amount: {
                    value: product.price,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order?.capture();
            console.log("order", order);

            handleApprove(data.orderID);
          }}
          onCancel={() => {
            // Display the cancel message, modal or redirect user to cancel page or back to cart page
          }}
          onError={(err) => {
            setError(err as unknown as SetStateAction<string>);
            console.log("Paypal checkout onError", err);
          }}
        />
        <Link
          to="/cart"
          className="button button--outline button--add go-back-btn"
        >
          <span>Back</span>
        </Link>
      </div>
    </PayPalScriptProvider>
  );
};

export default Paypal;
