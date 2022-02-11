const data = {
  snackBar: {
    show: false,
    message: "",
    time: 2000,
    severity: undefined,
    vertical: "top",
    horizontal: "left",
  },
};

const SnackBar = (state = data, action) => {
  switch (action.type) {
    case "SNACKBAR":
      return {
        snackBar: {
          show: action.payload.show,
          time: action.payload.time || 2000,
          vertical: action.payload.vertical || "bottom",
          horizontal: action.payload.horizontal || "left",
          message: action.payload.message,
          severity: action.payload.severity,
        },
      };

    default:
      return state;
  }
};

export default SnackBar;
