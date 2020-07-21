import React from "react";
import Layout from "../Layout";
import BackButton from "../BackButton";
import { Container, Grid, FormField, Button } from "semantic-ui-react";
import Form from "../Form";
import { connect } from "react-redux";
import { setOrderId, setOrderStatus } from "../../redux/actions";
import { useHistory } from "react-router-dom";

const OrderCheckForm = ({
  orderId,
  setOrderId,
  orderStatus,
  setOrderStatus,
}) => {
  const history = useHistory();

  const handleSubmit = () => {
    fetch(`https://tyy-orders.herokuapp.com/orders/status/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "get",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setOrderStatus(res.orderStatus);
        return res;
      });
  };

  const handleInput = (e) => {
    setOrderId(e.target.value.trim());
  };

  return (
    <Layout>
      <BackButton to="/">Back</BackButton>
      <Container>
        <Grid centered>
          <Grid.Row>
            <Grid.Column color="black" computer={6} tablet={8} mobile={10}>
              {!orderStatus && (
                <Form onSubmit={handleSubmit}>
                  <FormField>
                    <label>Order ID</label>
                    <input
                      placeholder="Order ID"
                      value={orderId}
                      onChange={(e) => handleInput(e)}
                    />
                  </FormField>
                  <Button primary type="submit">
                    Check order
                  </Button>
                </Form>
              )}
              {orderStatus && (
                <>
                  <h2>
                    Your order{" "}
                    {orderStatus === "delivered" && "has been delivered!"}
                    {orderStatus === "confirmed" && "is on the way!"}
                    {orderStatus === "cancelled" && "was cancelled!"}
                    {orderStatus === "created" && "was not completed!"}
                  </h2>
                  <Button
                    color="blue"
                    inverted
                    onClick={() => {
                      setOrderId("");
                      setOrderStatus("");
                      history.push("/");
                    }}
                  >
                    Go back
                  </Button>
                </>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Layout>
  );
};

const mapStateToProps = ({ ordersReducer: { orderId, orderStatus } }) => {
  return { orderId, orderStatus };
};

const mapDispatchToProps = (dispatch) => ({
  setOrderId: (orderId) => dispatch(setOrderId(orderId)),
  setOrderStatus: (orderStatus) => dispatch(setOrderStatus(orderStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderCheckForm);
