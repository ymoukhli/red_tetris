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
    align-items: center;
    
`

export const StyledGameInterface = styled.div`
    margin: 0 auto;
    border: 1px solid black;
    background-color: #f00;
`