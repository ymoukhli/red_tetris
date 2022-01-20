import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 0.5em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export default function Button({text, onClick, type})
{
    return (
        <StyledButton type={type} onClick={onClick}>{text}</StyledButton>
    )
}