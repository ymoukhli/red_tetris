import styled from 'styled-components';
import background from "../Images/background.jpg";


export const StyledGameInterfaceWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #333;
    background-size: cover;
    background-image: url(${background});
    overflow: hidden;
    display: flex;
    justify-content: center;
`

export const StyledGameInterface = styled.div`
    width: 100vw;
    height: 100vh;  
    border: 1px solid black;
    background-color: #f00;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-content: center;
    align-items: center;
`