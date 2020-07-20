import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const OrderForm = ({ productCode, price }) => {
  const history = useHistory();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!productCode || !price) {
      history.push("/order");
    }
  }, []);

  const handleSubmit = () => {
    fetch("https://tyy-orders.herokuapp.com/orders", {
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
      .then((res) => console.log(res));
  };

  const handleInput = (e) => {
    setName(e.target.value);
  };

  return (
    <Container>
      <div
        onClick={() => {
          history.push("/order");
        }}
      >
        Back
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input placeholder="Name" onChange={(e) => handleInput(e)} />
        </Form.Field>
        <Form.Field disabled>
          <label>Product</label>
          <input value={productCode} />
        </Form.Field>
        <Form.Field disabled>
          <label>Price</label>
          <input value={price} />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = ({ ordersReducer: { productCode, price } }) => {
  return { productCode, price };
};

export default connect(mapStateToProps)(OrderForm);
