import React from "react";
import { Image, Button } from "semantic-ui-react";
import styled from "styled-components";
import { useHistory, useRouteMatch } from "react-router-dom";
import { setSelectedProduct } from "../../redux/actions";
import { connect } from "react-redux";

const Slide = styled.div`
  border: 3px solid white;
  padding: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  img {
    margin-right: 2rem;
    object-fit: contain;
  }

  > div:last-child {
    width: 100%;
  }
`;

const ProductTitle = styled.h2`
  color: #fefefe;
`;

const JacobsSlide = ({
  image,
  productName,
  description,
  price,
  productCode,
  setSelectedProduct
}) => {
  const history = useHistory();
  const { path } = useRouteMatch();

  return (
    <Slide>
      <Image src={image} />
      <div>
        <ProductTitle>{productName}</ProductTitle>
        <h3>RM{price}</h3>
        <p>{description}</p>
        <Button
          inverted
          color="blue"
          onClick={() => {
            setSelectedProduct({ productCode: productCode, price: price });
            history.push(`${path}/form`);
          }}
        >
          Order now!
        </Button>
      </div>
    </Slide>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setSelectedProduct: (product) => dispatch(setSelectedProduct(product)),
});

export default connect(null, mapDispatchToProps)(JacobsSlide);
