import Playground from "./Playground";


export default function DisplayCard({grid, score, lines, username}) {
    return (
        <Playground grid={grid} score={score} lines={lines} username={username}></Playground>
    )
}