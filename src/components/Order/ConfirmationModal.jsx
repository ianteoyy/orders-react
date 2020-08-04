import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  ModalContent,
  Grid,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { setPaymentStatus } from "../../redux/actions";

const StyledModalContent = styled(ModalContent)`
  margin-bottom: 1rem;
`;

const ConfirmationModal = ({
  isOpen,
  setIsOpen,
  paymentId,
  orderId,
  setPaymentStatus,
}) => {
  const history = useHistory();
  const [cardNumber, setCardNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    setError(null);
    setCardNumber(e.target.value);
  };

  const handleSubmit = () => {
    setError(null);
    if (cardNumber.length === 16 && !isNaN(cardNumber)) {
      setIsSubmitting(true);
      verifyPayment(paymentId, orderId);
    } else {
      setError("Please enter a valid card number.");
    }
  };

  const verifyPayment = async (paymentId, orderId) => {
    let paymentResult = await fetch(
      "https://tyy-payments.herokuapp.com/payments/confirm",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          paymentId: paymentId,
          orderId: orderId,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.paymentResult === "success" || res.paymentResult === "failed") {
          setPaymentStatus(res.paymentResult);
        }
        return res.paymentResult;
      });

    if (paymentResult) {
      endPaymentProcess(orderId, paymentResult);
    }
  };

  const endPaymentProcess = async (orderId, result) => {
    await fetch("https://tyy-orders.herokuapp.com/orders/complete", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        orderId: orderId,
        result: result,
      }),
    });
    history.push('/order/acknowledgement')
  };

  return (
    <Modal
      open={isOpen}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      style={{ background: "none" }}
    >
      <Grid centered>
        <Grid.Column color="black" computer={5} tablet={8} mobile={10}>
          <Modal.Header>Confirm purchase</Modal.Header>
          <Form onSubmit={handleSubmit}>
            <StyledModalContent>
              <p>Please enter your credit card details here</p>
              <Form.Field
                error={error && { content: error, pointing: "below" }}
                placeholder="Card number"
                value={cardNumber}
                onChange={(e) => handleInput(e)}
                label="Card number"
                control={Input}
              />
            </StyledModalContent>
            <Modal.Actions>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  history.push("/order");
                }}
                negative
                disabled={isSubmitting}
                type="button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                positive
                labelPosition="right"
                icon="checkmark"
                content="Submit"
                disabled={isSubmitting}
                loading={isSubmitting}
              />
            </Modal.Actions>
          </Form>
        </Grid.Column>
      </Grid>
    </Modal>
  );
};

const mapStateToProps = ({ ordersReducer: { orderId } }) => {
  return { orderId };
};

const mapDispatchToProps = (dispatch) => ({
  setPaymentStatus: (orderId) => dispatch(setPaymentStatus(orderId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);
