import React from "react";
import Layout from "../Layout";
import { Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Acknowledgement = ({ orderId, paymentStatus }) => {
  const history = useHistory();
  return (
    <Layout>
      <Grid centered>
        <Grid.Column color="white" computer={5} tablet={8} mobile={10}>
          <h2>
            Payment for order {orderId}{" "}
            {paymentStatus === "success" ? "is successful!" : "has failed"}
          </h2>
          <Button color="blue" inverted onClick={() => history.push("/")}>
            Go back
          </Button>
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = ({ ordersReducer: { orderId, paymentStatus } }) => {
  return { orderId, paymentStatus };
};

export default connect(mapStateToProps)(Acknowledgement);
