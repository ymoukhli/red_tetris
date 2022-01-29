import React from "react";
import styled from "styled-components";

const width = 30;


const Styled1 = styled.div`
display: grid;
grid-template-columns: ${props => props.width}px;
grid-template-rows: repeat(4, ${props => props.width}px);
`

const Styled22 = styled.div`
    display: grid;
    grid-template-columns: repeat(2, ${props => props.width}px);
    grid-template-rows: repeat(2, ${props => props.width}px);
`
const Styled23 = styled.div`
    display: grid;
    grid-template-columns: repeat(2, ${props => props.width}px);
    grid-template-rows: repeat(3, ${props => props.width}px);
`

const Styled32 = styled.div`
    display: grid;
    grid-template-columns: repeat(3, ${props => props.width}px);
    grid-template-rows: repeat(2, ${props => props.width}px);
`

const StyledDisplayCube = styled.div`
background-color: #7897AB;
border: 1px solid #D885A3;
`
const StyledEmptyCube = styled.div`
`

export const L = () => {
    return (<Styled32 width={width}>
        <StyledDisplayCube key="L1"></StyledDisplayCube>
        <StyledDisplayCube key="L2"></StyledDisplayCube>
        <StyledEmptyCube key="L1"></StyledEmptyCube>
        <StyledEmptyCube key="L2"></StyledEmptyCube>
        <StyledDisplayCube key="L3"></StyledDisplayCube>
        <StyledDisplayCube key="L4"></StyledDisplayCube>
    </Styled32>)
}
export const T = () => {
    return (<Styled32 width={width}>
        <StyledEmptyCube key="T1"></StyledEmptyCube>
        <StyledDisplayCube key="T1"></StyledDisplayCube>
        <StyledEmptyCube key="T2"></StyledEmptyCube>
        <StyledDisplayCube key="T2"></StyledDisplayCube>
        <StyledDisplayCube key="T3"></StyledDisplayCube>
        <StyledDisplayCube key="T4"></StyledDisplayCube>
    </Styled32>)
}
export const R = () => {
    return (<Styled32 width={width}>
        <StyledEmptyCube key="R1"></StyledEmptyCube>
        <StyledDisplayCube key="R1"></StyledDisplayCube>
        <StyledDisplayCube key="R2"></StyledDisplayCube>
        <StyledDisplayCube key="R3"></StyledDisplayCube>
        <StyledDisplayCube key="R4"></StyledDisplayCube>
        <StyledEmptyCube key="R2"></StyledEmptyCube>
    </Styled32>)
}
export const C = () => {
    return (<Styled22 width={width}>
        <StyledDisplayCube key="C1"></StyledDisplayCube>
        <StyledDisplayCube key="C2"></StyledDisplayCube>
        <StyledDisplayCube key="C3"></StyledDisplayCube>
        <StyledDisplayCube key="C4"></StyledDisplayCube>
    </Styled22>)
}
export const E = () => {
    return (<Styled23 width={width}>
        <StyledDisplayCube key="E1"></StyledDisplayCube>
        <StyledDisplayCube key="E2"></StyledDisplayCube>
        <StyledEmptyCube key="E1"></StyledEmptyCube>
        <StyledDisplayCube key="E3"></StyledDisplayCube>
        <StyledEmptyCube key="E2"></StyledEmptyCube>
        <StyledDisplayCube key="E4"></StyledDisplayCube>
    </Styled23>)
}
export const K = () => {
    return (<Styled23 width={width}>
        <StyledDisplayCube key="K1"></StyledDisplayCube>
        <StyledDisplayCube key="K2"></StyledDisplayCube>
        <StyledEmptyCube key="Ke1"></StyledEmptyCube>
        <StyledDisplayCube key="K3"></StyledDisplayCube>
        <StyledEmptyCube key="Ke2"></StyledEmptyCube>
        <StyledDisplayCube key="K4"></StyledDisplayCube>
    </Styled23>)
}

export const I = () => {
    return (<Styled1 width={width}>
        <StyledDisplayCube key="I1"></StyledDisplayCube>
        <StyledDisplayCube key="I2"></StyledDisplayCube>
        <StyledDisplayCube key="I3"></StyledDisplayCube>
        <StyledDisplayCube key="I4"></StyledDisplayCube>
    </Styled1>)
}