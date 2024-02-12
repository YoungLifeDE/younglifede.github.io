import React from 'react';
import {onValue, ref, set} from "firebase/database";

import {DotCustomIcon, HexagonCustomIcon, SquareCustomIcon, StarCustomIcon} from "../../../../../../components/icons";
import {QuestionType} from "../../../../../../components/card/Card";
import {QUESTION_TYPE} from "../../../../../../constants";
import {db} from "../../../../../../firebase/firebase";
import {getCorrectScore} from "../utils";

type Props = {
    setWaitingState: (state: boolean) => void,
    currentQuestion: QuestionType | null
}

export const StageFourthQuizView = ({currentQuestion, setWaitingState}: Props) => {
    const chooseVariant = (variant: string) => {
        setWaitingState(false);

        const time = sessionStorage.getItem("time");
        const name = sessionStorage.getItem("name");

        const isCorrectedAnswer = currentQuestion?.QUIZ?.correctVariant === variant;
        let streak = 0;
        const winStreakRef = ref(db, `/game/players/${name}/winStreak`);
        onValue(winStreakRef, (snapshot) => {
            const winStreak = snapshot.val();

            if (isCorrectedAnswer) {
                streak = winStreak + 1;
                set(winStreakRef, winStreak + 1);
            } else {
                streak = 0;
                set(winStreakRef, 0);
            }
        }, {onlyOnce: true});

        const lastAnswerAnswerRef = ref(db, `/game/players/${name}/lastAnswer/answer`);
        set(lastAnswerAnswerRef, variant);

        const lastAnswerQuestionIdRef = ref(db, `/game/players/${name}/lastAnswer/questionId`);
        set(lastAnswerQuestionIdRef, currentQuestion?.id);

        if (time && isCorrectedAnswer) {
            const refMyScore = ref(db, `/game/players/${name}/score`);
            onValue(refMyScore, (snapshot) => {
                const prevScore = snapshot.val();
                const score = getCorrectScore({
                    type: QUESTION_TYPE.QUIZ,
                    questionTime: currentQuestion?.time,
                    answerTime: +time,
                    streak
                });

                sessionStorage.setItem("lastScore", `${score}`);
                set(refMyScore, +prevScore + score);
            }, {onlyOnce: true});
        }
    };

    return (
        <div className={`stage-fourth__quiz-mobile ${currentQuestion?.QUIZ?.isImageQuiz ? 'image-mode' : ''}`}>

            <div className="fourth-stage__icon" onClick={() => chooseVariant('A')}>
                {currentQuestion?.QUIZ?.isImageQuiz &&
                    <div className="square-icon">
                        <img src={currentQuestion?.QUIZ?.linkToImageA} className="quiz-mobile__image-mode" alt=""/>
                    </div>
                }
                <div className="icon__image-quiz square-icon">
                    <SquareCustomIcon className="icon"/>
                    {currentQuestion?.QUIZ?.isImageQuiz && <span>{currentQuestion?.QUIZ?.variantA}</span>}
                </div>
            </div>

            <div className="fourth-stage__icon" onClick={() => chooseVariant('B')}>
                {currentQuestion?.QUIZ?.isImageQuiz &&
                    <div className="circle-icon">
                        <img src={currentQuestion?.QUIZ?.linkToImageB} className="quiz-mobile__image-mode" alt=""/>
                    </div>
                }
                <div className="icon__image-quiz circle-icon">
                    <DotCustomIcon className="icon"/>
                    {currentQuestion?.QUIZ?.isImageQuiz && <span>{currentQuestion?.QUIZ?.variantB}</span>}
                </div>
            </div>

            <div className="fourth-stage__icon" onClick={() => chooseVariant('C')}>
                {currentQuestion?.QUIZ?.isImageQuiz &&
                    <div className="triangle-icon">
                        <img src={currentQuestion?.QUIZ?.linkToImageC} className="quiz-mobile__image-mode" alt=""/>
                    </div>
                }
                <div className="icon__image-quiz triangle-icon">
                    <HexagonCustomIcon className="icon"/>
                    {currentQuestion?.QUIZ?.isImageQuiz && <span>{currentQuestion?.QUIZ?.variantC}</span>}
                </div>
            </div>

            <div className="fourth-stage__icon" onClick={() => chooseVariant('D')}>
                {currentQuestion?.QUIZ?.isImageQuiz &&
                    <div className="star-icon">
                        <img src={currentQuestion?.QUIZ?.linkToImageD} className="quiz-mobile__image-mode" alt=""/>
                    </div>
                }
                <div className="icon__image-quiz star-icon">
                    <StarCustomIcon className="icon"/>
                    {currentQuestion?.QUIZ?.isImageQuiz && <span>{currentQuestion?.QUIZ?.variantD}</span>}
                </div>
            </div>
        </div>
    );
};
