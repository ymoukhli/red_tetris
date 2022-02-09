import React from "react";
import DisplayCard from "./DisplayCard";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function DisplayForOther() {
  //#region redux

  const data = useSelector((state) => state.Users);
  //#endregion

  const display = Object.values(data.users).map((user, index) => (
    <Item>
      <DisplayCard key={index} grid={user.grid} score={user.score} lines={user.lines}></DisplayCard>
    </Item>
  ));
  return <div> {display} </div>;
}
