import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { TrigerSnackBar } from "../../Store/actions";

export default function Nav() {
  //#region redux

  const snackBar = useSelector((state) => state.SnackBar.snackBar);

  const dispatch = useDispatch();

  //#endregion

  const handleClose = (event, reason) => {
    console.log(event, reason);
    dispatch(TrigerSnackBar({ show: false, message: "", severity: snackBar.severity }));
  };

  return (
    <React.Fragment>
      {snackBar ? (
        <Snackbar
          open={snackBar.show}
          autoHideDuration={snackBar.time}
          onClose={handleClose}
          anchorOrigin={{ vertical: snackBar.vertical, horizontal: snackBar.horizontal }}
        >
          <Alert sx={{ width: "300px" }} severity={snackBar.severity} elevation={6} variant="filled">
            {snackBar.message}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
