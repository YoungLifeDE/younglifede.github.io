

export type CorrectQuizAnswer = 'A' | 'B' | 'C' | 'D';

export type QuizTypes = {
    variantA?: string,
    linkToImageA?: string,
    variantB?: string,
    linkToImageB?: string,
    variantC?: string,
    linkToImageC?: string,
    variantD?: string,
    linkToImageD?: string,
    isImageQuiz?: boolean,
    correctVariant?: CorrectQuizAnswer,
    linkToCorrectImage?: string
};

export type TrueOrFalseTypes = {
    correctVariant?: string
};
export type TypeAnswerTypes = {
    correctVariant?: string
};
export type SliderTypes = {
    min?: number,
    max?: number,
    correctVariant?: number
};

export type PuzzleType = {
    id: number,
    value: string
};
export type PuzzleTypes = { [key: string]: PuzzleType };

export type AllQuestionVariantsType = QuizTypes | TrueOrFalseTypes | TypeAnswerTypes | SliderTypes | PuzzleTypes;

