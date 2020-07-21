import { Form as UnstyledForm } from "semantic-ui-react";
import styled from "styled-components";

const Form = styled(UnstyledForm)`
  &&& label {
    color: unset;
  }
`;

export default Form;
