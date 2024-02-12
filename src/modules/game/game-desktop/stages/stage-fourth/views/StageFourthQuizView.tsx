import React from 'react';
import {DotCustomIcon, HexagonCustomIcon, SquareCustomIcon, StarCustomIcon} from "../../../../../../components/icons";
import {QuizTypes} from "../../../../../../types.ts";

type Props = {
    currentQuestion?: QuizTypes
};
export const StageFourthQuizView = ({currentQuestion}: Props) => {
    return (
        <>
            {currentQuestion?.variantA && <div className="first-button quiz">
                <SquareCustomIcon className="icon"/>
                {!currentQuestion?.isImageQuiz ? currentQuestion?.variantA : 'Фото №1'}
            </div>}

            {currentQuestion?.variantB && <div className="second-button">
                <DotCustomIcon className="icon"/>
                {!currentQuestion?.isImageQuiz ? currentQuestion?.variantB : 'Фото №2'}
            </div>}

            {currentQuestion?.variantC && <div className="third-button">
                <HexagonCustomIcon className="icon"/>
                {!currentQuestion?.isImageQuiz ? currentQuestion?.variantC : 'Фото №3'}
            </div>}

            {currentQuestion?.variantD && <div className="fourth-button">
                <StarCustomIcon className="icon" />
                {!currentQuestion?.isImageQuiz ? currentQuestion?.variantD : 'Фото №4'}
            </div>}
        </>
    );
};
