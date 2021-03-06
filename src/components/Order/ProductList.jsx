import React from "react";
import Slider from "react-slick";
import { Container } from "semantic-ui-react";

import jacobs03 from "../../images/jacobs03.png";
import jacobs12 from "../../images/jacobs12.png";
import JacobsSlide from "./JacobsSlide";
import Layout from "../Layout";
import BackButton from "../BackButton";
import { Link } from "react-router-dom";

const ProductList = () => {
  return (
    <Layout>
      <BackButton to="/">Home</BackButton>
      <Container>
        <Slider
          settings={{
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
          }}
        >
          <JacobsSlide
            image={jacobs03}
            productName="3-month subscription"
            description="Unsure of the service? Don't know if you'll like Cream Crackers? This is designed for those who aren't sure to test the waters - try it out for 3 months and get a discount code for your next purchase!"
            price={35}
            productCode="JACOBS03"
          />
          <JacobsSlide
            image={jacobs12}
            productName="12-month subscription"
            description="For lovers of the classic, 12 months of Cream Crackers delivered right to your doorstep each month! Comes with a free pair of biscuit gloves to handle your biscuits while keeping your fingers clean!"
            price={148}
            productCode="JACOBS12"
          />
        </Slider>
        <Link to="/check">Or check your order here!</Link>
      </Container>
    </Layout>
  );
};

export default ProductList;
