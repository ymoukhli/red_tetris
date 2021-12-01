import styled from 'styled-components';
import background from "../Images/background.jpg";


export const StyledGameInterfaceWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #333;
    background-image: url(${background});
    overflow: hidden;
`

export const StyledGameInterface = styled.div`
    margin: 0 auto;
    max-width: 960px;
    display: flex;
`