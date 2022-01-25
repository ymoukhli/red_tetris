import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfoCard from "./InfoCard";

const StyledNav = styled.div`
top: 0;
width: 100vw;
display: flex;
flex-direction: row;
border-bottom: 3px solid black;
`

const StyledStart = styled.button`
    padding: 1em 3em;
`

export default function Nav({io, reset}) {

    const [room, setRoom] = useState([]);

    useEffect(() => {
        io.on("joined", (users) => {
    
            const arr = [];
            for (let user in users)
            {
                arr.push({username : users[user].username, score : users[user].score, lines: users[user].score});
            }
            setRoom(arr);
            
        })
    
        io.on("collided", ({username, score, lines}) => {
            setRoom(prev => {
                const tmp = [...prev];
                const arr = tmp.find(e => e.username === username);
                if (arr)
                {
                    arr.score = score;
                    arr.lines = lines;
                }
                return tmp;
            })
        })
    
        io.on("left", ({ username }) => {
            setRoom(prev => {
                console.log(prev);
                return prev.filter(e => e.username !== username)
            });
        })
    }, [])
    
    const userInfo = room.map(x => <InfoCard username={x.username} score={x.score} lines={x.lines}></InfoCard>);

    return (<StyledNav>
        <StyledStart onClick={reset}>start</StyledStart>
        {userInfo}
    </StyledNav>)
} 