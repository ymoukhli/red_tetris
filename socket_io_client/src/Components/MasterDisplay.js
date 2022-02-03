import React, { useEffect } from "react";
import Playground from "./Playground";
import styled from "styled-components";
import Display from "./Display";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { action } from '../redux/actions'

const StyledMasterDisplay = styled.div`
    display: flex;
    width: 50vw;
    min-width: 400px;
`
export default function MasterDisplay( {io})
{
    const {grid} = useSelector(state => state);
    const dispatch = useDispatch();
    const { setGrid } =  bindActionCreators(action, dispatch);
    useEffect(() => {
        io.on("respond", (data) => {
            setGrid(data.playground);
          });
    },[])
    return (
    <StyledMasterDisplay>
        <Playground grid={grid}></Playground>
        <Display io={io}></Display>
    </StyledMasterDisplay>
    )
}         

                