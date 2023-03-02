import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getGame } from "../../utils/saveGame";
import Cell from "../Cell/Cell";

const StyledBoard = styled.div`

    padding: 10px;

    display: grid;
    grid-template-rows: repeat(3, 60px);
    grid-template-columns: repeat(3, 60px);

    justify-content: center;
    align-content: center;

    opacity: ${props => props.disabled ? '.8' : '1'};
`;

const defaultGame = [
    [null, null, 'o', null, null, null, null, null, null],
    [null, null, 'o', null, 'x', null, null, null, null],
    ['o', null, 'o', null, 'x', null, null, null, null],
    ['o', 'x', 'o', null, 'x', null, null, null, null],
    ['o', 'x', 'o', null, 'x', null, null, 'o', null],
    ['o', 'x', 'o', null, 'x', 'x', null, 'o', null],
    ['o', 'x', 'o', 'o', 'x', 'x', null, 'o', null],
    ['o', 'x', 'o', 'o', 'x', 'x', 'x', 'o', null],
    ['o', 'x', 'o', 'o', 'x', 'x', 'x', 'o', 'o'],
];

function MainAnimation() {

    const intervalRef = useRef(null);

    const [lastGame, setLastGame] = useState(() => {

        const lastGame = getGame();

        return lastGame || defaultGame;
    });

    const [iterator, setIterator] = useState(lastGame.entries());

    const [board, setBoard] = useState(new Array(9).fill(null));

    useEffect(() => {
        
        intervalRef.current = setInterval(() => {


            const item = iterator.next();

            if(!item.done){

                setBoard(item.value[1]);
            }
            else {

                setIterator(lastGame.entries());
                setBoard(new Array(9).fill(null));
            }

        }, 1500);


        return () => {
            if(intervalRef.current){

                clearInterval(intervalRef.current);
            } 
        }

    }, [iterator]);
    

    return (<div>
        <StyledBoard>
            {
                board.map((value, index) => {

                    return <Cell value={value} key={'c-'+index} padding={'17px'} />
                })
            }
        </StyledBoard>
    </div>);
}

export default MainAnimation;