import styled from "styled-components";

// position: absolute;
export const StyledPlaygroundOthers = styled.div`
  display: grid;
  justify-self: center;
  place-content: center;
  grid-template-rows: repeat(${(props) => props.height}, calc(${(props) => props.size - 3}vh / ${(props) => props.height}));
  grid-template-columns: repeat(${(props) => props.width}, calc(${(props) => props.size - 3}vh / ${(props) => props.height}));
  @media (min-aspect-ratio: 1/1) {
    grid-template-rows: repeat(${(props) => props.height}, calc(${(props) => props.size}vh / ${(props) => props.height}));
    grid-template-columns: repeat(${(props) => props.width}, calc(${(props) => props.size}vh / ${(props) => props.height}));
  }
  @media only screen and (min-width: 1024px) {
    grid-template-rows: repeat(${(props) => props.height}, calc(${(props) => props.size + 6}vh / ${(props) => props.height}));
    grid-template-columns: repeat(${(props) => props.width}, calc(${(props) => props.size + 6}vh / ${(props) => props.height}));
  }
  @media only screen and (max-width: 350px) {
    grid-template-rows: repeat(${(props) => props.height}, calc(${(props) => props.size - 10}vh / ${(props) => props.height}));
    grid-template-columns: repeat(${(props) => props.width}, calc(${(props) => props.size - 10}vh / ${(props) => props.height}));
  }
`;

export const StyledPlaygroundMaster = styled.div`
  display: grid;
  justify-self: center;
  place-content: center;
  grid-template-rows: repeat(${(props) => props.height}, calc(${(props) => props.size - 20}vh / ${(props) => props.height}));
  grid-template-columns: repeat(${(props) => props.width}, calc(${(props) => props.size - 20}vh / ${(props) => props.height}));
  @media (min-aspect-ratio: 1/1) {
    grid-template-rows: repeat(${(props) => props.height}, calc(${(props) => props.size}vh / ${(props) => props.height}));
    grid-template-columns: repeat(${(props) => props.width}, calc(${(props) => props.size}vh / ${(props) => props.height}));
  }
  @media only screen and (min-width: 1024px) {
    grid-template-rows: repeat(${(props) => props.height}, calc(${(props) => props.size + 5}vh / ${(props) => props.height}));
    grid-template-columns: repeat(${(props) => props.width}, calc(${(props) => props.size + 5}vh / ${(props) => props.height}));
  }
  @media only screen and (max-width: 1024px) {
    grid-template-rows: repeat(${(props) => props.height}, calc(${(props) => props.size - 5}vh / ${(props) => props.height}));
    grid-template-columns: repeat(${(props) => props.width}, calc(${(props) => props.size - 5}vh / ${(props) => props.height}));
  }
  @media only screen and (max-width: 768px) {
    grid-template-rows: repeat(
      ${(props) => props.height},
      calc(${(props) => (props.solo ? props.size - 15 : props.size + 3)}vh / ${(props) => props.height})
    );
    grid-template-columns: repeat(
      ${(props) => props.width},
      calc(${(props) => (props.solo ? props.size - 15 : props.size + 3)}vh / ${(props) => props.height})
    );
  }
  @media only screen and (max-width: 425px) {
    grid-template-rows: repeat(${(props) => props.height}, calc(${(props) => props.size - 15}vh / ${(props) => props.height}));
    grid-template-columns: repeat(${(props) => props.width}, calc(${(props) => props.size - 15}vh / ${(props) => props.height}));
  }
`;
