import React from "react";
import { useSelector } from "react-redux";
import style from "styled-components";
import * as Shape from "./Shapes";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const StyledDisplay = style.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-flow: row-reverse;
`;

export default function Display() {
  const tetrminosQueue = useSelector((state) => state.GameInterface.display);
  const started = useSelector((state) => state.Nav.GameStart);
  let tetriminos = [];
  if (started) {
    tetriminos = tetrminosQueue.map((e, index) => {
      const Component = Shape[e];
      return (
        <Item  key={index}>
          <Component />
        </Item>
      );
    });
  }
  return (
    <Item>
      <StyledDisplay>{tetriminos}</StyledDisplay>
    </Item>
  );
}
