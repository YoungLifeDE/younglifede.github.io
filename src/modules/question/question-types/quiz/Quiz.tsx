import React, {useEffect} from 'react';
import {TextField} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import {CustomSelect} from "../../../../components/select";
import {QuizTypes} from "../../../../types.ts";

import './styles.scss';

type Props = {
    questionTypeParams: QuizTypes | null,
    setQuestionTypeParams: (questionParams: QuizTypes) => void,
};
const Quiz = (props: Props) => {
    const {questionTypeParams, setQuestionTypeParams} = props;

    useEffect(() => {
        setQuestionTypeParams({
            variantA: questionTypeParams?.variantA || '',
            variantB: questionTypeParams?.variantB || '',
            variantC: questionTypeParams?.variantC || '',
            variantD: questionTypeParams?.variantD || '',
            isImageQuiz: questionTypeParams?.isImageQuiz || false,
            correctVariant: questionTypeParams?.correctVariant || 'A'
        })
    }, []);

    const setValue = (key: string, value: string | boolean) => {
        setQuestionTypeParams({
            ...questionTypeParams,
            [key]: value
        })
    };

    return (
        <div>
            <FormGroup>
                <FormControlLabel control={
                    <Checkbox
                        checked={questionTypeParams?.isImageQuiz}
                        onChange={e => setValue('isImageQuiz', e.target.checked)}
                    />
                } label="Is Photo Quiz "/>
            </FormGroup>
            <TextField
                size="small"
                className="question__input"
                label="Варіант  A*"
                variant="outlined"
                value={questionTypeParams?.variantA || ''}
                onChange={e => setValue('variantA', e.target.value)}
            />
            <TextField
                size="small"
                className="question__input"
                label="Варіант Б*"
                variant="outlined"
                value={questionTypeParams?.variantB || ''}
                onChange={e => setValue('variantB', e.target.value)}
            />
            <TextField
                size="small"
                className="question__input"
                label="Варіант В*"
                variant="outlined"
                value={questionTypeParams?.variantC || ''}
                onChange={e => setValue('variantC', e.target.value)}
            />
            <TextField
                size="small"
                className="question__input"
                label="Варіант Г*"
                variant="outlined"
                value={questionTypeParams?.variantD || ''}
                onChange={e => setValue('variantD', e.target.value)}
            />
            <CustomSelect defaultValue={questionTypeParams?.correctVariant} setCorrectAnswer={setValue}/>
        </div>
    );
};

export default Quiz;
