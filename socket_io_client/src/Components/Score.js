import React from "react";


export default function Score({text, Value = 0})
{
    return (
        <div>{text}{Value}</div>
    )
}