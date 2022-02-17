const data = {
  overlay: {
    show: false,
    message: "",
  },
};

const Overlay = (state = data, action) => {
  switch (action.type) {
    case "OVERLAY":
      return {
        overlay: {
          show: action.payload.show,
          message: action.payload.message,
        },
      };
    case "RESTART":
      return {
        overlay: {
          show: false,
          message: "",
        },
      };

    default:
      return state;
  }
};

export default Overlay;
