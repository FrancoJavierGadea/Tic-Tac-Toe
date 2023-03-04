import styled from "styled-components";
import Cell from "../Cell/Cell";

const StyledBoard = styled.div`

    width: fit-content;
    margin: auto;
    padding: 10px;

    display: grid;
    grid-template-rows: repeat(3, 100px);
    grid-template-columns: repeat(3, 100px);

    justify-content: center;
    align-content: center;

    position: relative;
    z-index: 5000;

    opacity: ${props => props.disabled ? '.8' : '1'};
`;

function Board({values, cellClick = () => {}, disabled}) {

    const handleClick = (cell) => {

        if(!disabled){

            cellClick(cell);
        }
    }

    return (<StyledBoard disabled={disabled}>

        {
            values?.map((value, index) => {

                return <Cell value={value} index={index} key={'cell-' + index} onClick={handleClick} />
            })
        }

    </StyledBoard>);
}

export default Board;