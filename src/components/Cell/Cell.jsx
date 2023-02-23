import styled from "styled-components";

const StyledCell = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #2D2D6B;
    font-size: 28pt;
    box-shadow: -0px 0px 5px 1px rgba(255,255,255,.5) inset;

    &:hover {
        background-color: #2d2d6bd0;
    }
`;


function Cell({value, index, onClick = () => {}}) {

    const handleClick = () => {

        onClick(index);
    }

    return (<StyledCell className="border" onClick={handleClick} >

        { value === 'o' && <i className="bi bi-circle text-success"></i> }

        { value === 'x' && <i className="bi bi-x-lg text-danger"></i> }

    </StyledCell>);
}

export default Cell;