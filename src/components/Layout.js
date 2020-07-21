import styled from "styled-components";
import { fadeIn } from "./keyframes";

const Layout = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s;
`;

export default Layout;
