import React, {useEffect, useState} from 'react';
import CheckIcon from "@mui/icons-material/Check";
import {Button, Zoom} from "@mui/material";
import {onValue, ref} from "firebase/database";

import {DotCustomIcon, HexagonCustomIcon, SquareCustomIcon, StarCustomIcon} from "../../../../../../components/icons";
import {QuestionType} from "../../../../../../components/card/Card";
import {getChartElements, getOpacityClassQuiz} from "../utils";
import {db} from "../../../../../../firebase/firebase";
import {User} from "../../../../types";

type Props = {
    currentQuestion: QuestionType | null,
    lastQuestion?: QuestionType,
    onClickNextStage: () => void
};

type Accumulator = {
    A: number,
    B: number,
    C: number,
    D: number
};


export const StageFifthQuizView = ({currentQuestion, lastQuestion, onClickNextStage}: Props) => {
    const [playersAnswered, setPlayersAnswered] = useState({A: 0, B: 0, C: 0, D: 0});
    const [players, setPlayers] = useState<User[]>([]);
    useEffect(() => {
        const playersRef = ref(db, `/game/players`);

        onValue(playersRef, (snapshot) => {
            const players = snapshot.val();
            const answers = Object.values(players) as User[];

            setPlayers(answers);
            const mappedAnswers = answers.length > 0 && answers.reduce((acc: Accumulator, player: User) => {
                const lastAnswer = player.lastAnswer.answer as keyof Accumulator;
                if (lastAnswer && currentQuestion?.id === player.lastAnswer.questionId) {
                    return {...acc, [lastAnswer]: acc[lastAnswer] + 1}
                }
                return acc;
            }, {A: 0, B: 0, C: 0, D: 0})
            if (mappedAnswers) {
                setPlayersAnswered(mappedAnswers);
            }
        }, {onlyOnce: true});
    }, []);

    return (
        <>
            <div className="stage-fifth__body">
                <Button variant="outlined" color="success" onClick={onClickNextStage}
                        className="stage-fourth__next-button">
                    {currentQuestion?.id !== lastQuestion?.id ? 'Далі' : 'Результати'}
                </Button>

                {
                    currentQuestion?.QUIZ?.isImageQuiz ? <img src={currentQuestion?.QUIZ?.linkToCorrectImage} alt=""/> :
                        <div className="stage-fourth__img stage-fifth__charts">
                            {getChartElements(playersAnswered).map(({answer, variant, className, icon}, index) => (
                                <Zoom key={index} in={true} timeout={2000}>
                                    <div
                                        className={`${className} ${currentQuestion?.QUIZ?.correctVariant === variant ? '' : 'chart-opacity'}`}>
                                        <div className="number">
                                            {currentQuestion?.QUIZ?.correctVariant === variant &&
                                                <CheckIcon className="check-icon"/>}
                                            {answer}
                                        </div>

                                        <div className="chart" style={{height: `${100 * answer / players.length}%`}}>
                                        </div>
                                        <div className="icon-wrapper">
                                            {icon}
                                        </div>
                                    </div>
                                </Zoom>
                            ))}
                        </div>
                }
            </div>

            <div className="stage-fourth__footer">
                {currentQuestion?.QUIZ?.variantA &&
                    <div className={`first-button ${getOpacityClassQuiz('A', currentQuestion)}`}>
                        <SquareCustomIcon className="icon"/>
                        {currentQuestion?.QUIZ?.variantA}
                    </div>}

                {currentQuestion?.QUIZ?.variantB &&
                    <div className={`second-button ${getOpacityClassQuiz('B', currentQuestion)}`}>
                        <DotCustomIcon className="icon"/>
                        {currentQuestion?.QUIZ?.variantB}
                    </div>}

                {currentQuestion?.QUIZ?.variantC &&
                    <div className={`third-button ${getOpacityClassQuiz('C', currentQuestion)}`}>
                        <HexagonCustomIcon className="icon"/>
                        {currentQuestion?.QUIZ?.variantC}
                    </div>}

                {currentQuestion?.QUIZ?.variantD &&
                    <div className={`fourth-button ${getOpacityClassQuiz('D', currentQuestion)}`}>
                        <StarCustomIcon className="icon"/>
                        {currentQuestion?.QUIZ?.variantD}
                    </div>}
            </div>
        </>
    );
};
