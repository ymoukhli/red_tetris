import React from "react";


export default function Score({text, value = 0})
{
    return (
        <div>{text}{value}</div>
    )
}