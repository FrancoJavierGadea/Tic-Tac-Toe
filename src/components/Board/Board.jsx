import styled from "styled-components";
import Cell from "../Cell/Cell";

const StyledBoard = styled.div`

    padding: 10px;

    display: grid;
    grid-template-rows: repeat(3, 100px);
    grid-template-columns: repeat(3, 100px);

    justify-content: center;
    align-content: center;

    opacity: ${props => props.disabled ? '.7' : '1'};
`;

function Board({values, cellClick, disabled}) {

    return (<StyledBoard disabled={disabled}>

        {
            values?.map((value, index) => {

                return <Cell value={value} index={index} key={'cell-' + index} onClick={cellClick} />
            })
        }

    </StyledBoard>);
}

export default Board;