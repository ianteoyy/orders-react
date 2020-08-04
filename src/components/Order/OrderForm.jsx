import React, { useState, useEffect } from "react";
import { Button, Container, Grid, FormField } from "semantic-ui-react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Layout from "../Layout";
import BackButton from "../BackButton";
import ConfirmationModal from "./ConfirmationModal";
import { setOrderId } from "../../redux/actions";
import Form from "../Form";

const OrderForm = ({ productCode, price, setOrderId }) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);

  useEffect(() => {
    if (!productCode || !price) {
      history.push("/order");
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    const generatedPaymentId = await createOrder(name, productCode, price);
    setPaymentId(generatedPaymentId);
    setConfirmationModal(true);
  };

  const createOrder = async (name, productCode, price) => {
    let generatedPaymentId;
    let orderId = await fetch("https://tyy-orders.herokuapp.com/orders", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({
        user: name,
        product: productCode,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        return res.id;
      });

    if (orderId) {
      setOrderId(orderId);
      generatedPaymentId = await createPayment(price, orderId);
    }

    return generatedPaymentId;
  };

  const createPayment = async (amount) => {
    const generatedPaymentId = await fetch(
      "https://tyy-payments.herokuapp.com/payments",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          amount: amount,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          return res.id;
        }
      });

    if (generatedPaymentId) {
      return generatedPaymentId;
    }
  };

  const handleInput = (e) => {
    setName(e.target.value);
  };

  return (
    <Layout>
      <BackButton to="/order">Back</BackButton>
      <Container>
        <Grid centered>
          <Grid.Row>
            <Grid.Column color="black" computer={5} tablet={8} mobile={10}>
              <Form onSubmit={handleSubmit}>
                <FormField>
                  <label>Name</label>
                  <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => handleInput(e)}
                  />
                </FormField>
                <FormField disabled>
                  <label>Product</label>
                  <input value={productCode} />
                </FormField>
                <FormField disabled>
                  <label>Price</label>
                  <input value={price} />
                </FormField>
                <Button
                  primary
                  type="submit"
                  disabled={submitting}
                  loading={submitting}
                >
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <ConfirmationModal
        isOpen={confirmationModal}
        setIsOpen={setConfirmationModal}
        paymentId={paymentId}
      />
    </Layout>
  );
};

const mapStateToProps = ({ ordersReducer: { productCode, price } }) => {
  return { productCode, price };
};

const mapDispatchToProps = (dispatch) => ({
  setOrderId: (orderId) => dispatch(setOrderId(orderId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
