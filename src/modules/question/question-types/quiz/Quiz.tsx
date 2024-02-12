import React, {useEffect} from 'react';
import {Divider, TextField} from "@mui/material";
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
            linkToImageA: questionTypeParams?.linkToImageA || '',
            variantB: questionTypeParams?.variantB || '',
            linkToImageB: questionTypeParams?.linkToImageB || '',
            variantC: questionTypeParams?.variantC || '',
            linkToImageC: questionTypeParams?.linkToImageC || '',
            variantD: questionTypeParams?.variantD || '',
            linkToImageD: questionTypeParams?.linkToImageD || '',
            isImageQuiz: questionTypeParams?.isImageQuiz || false,
            correctVariant: questionTypeParams?.correctVariant || 'A',
            linkToCorrectImage: questionTypeParams?.linkToCorrectImage || ''
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
            {
                questionTypeParams?.isImageQuiz &&
                <>
                    <TextField
                        size="small"
                        className="question__input"
                        label="Посилання на картинку А*"
                        variant="outlined"
                        value={questionTypeParams?.linkToImageA || ''}
                        onChange={e => setValue('linkToImageA', e.target.value)}
                    />
                    <Divider/>
                </>
            }

            <TextField
                size="small"
                className="question__input"
                label="Варіант Б*"
                variant="outlined"
                value={questionTypeParams?.variantB || ''}
                onChange={e => setValue('variantB', e.target.value)}
            />
            {
                questionTypeParams?.isImageQuiz &&
                <>
                    <TextField
                        size="small"
                        className="question__input"
                        label="Посилання на картинку Б*"
                        variant="outlined"
                        value={questionTypeParams?.linkToImageB || ''}
                        onChange={e => setValue('linkToImageB', e.target.value)}
                    />
                    <Divider/>
                </>
            }

            <TextField
                size="small"
                className="question__input"
                label="Варіант В*"
                variant="outlined"
                value={questionTypeParams?.variantC || ''}
                onChange={e => setValue('variantC', e.target.value)}
            />
            {
                questionTypeParams?.isImageQuiz &&
                <>
                    <TextField
                        size="small"
                        className="question__input"
                        label="Посилання на картинку В*"
                        variant="outlined"
                        value={questionTypeParams?.linkToImageC || ''}
                        onChange={e => setValue('linkToImageC', e.target.value)}
                    />
                    <Divider/>
                </>
            }

            <TextField
                size="small"
                className="question__input"
                label="Варіант Г*"
                variant="outlined"
                value={questionTypeParams?.variantD || ''}
                onChange={e => setValue('variantD', e.target.value)}
            />
            {
                questionTypeParams?.isImageQuiz &&
                <>
                    <TextField
                        size="small"
                        className="question__input"
                        label="Посилання на картинку Г*"
                        variant="outlined"
                        value={questionTypeParams?.linkToImageD || ''}
                        onChange={e => setValue('linkToImageD', e.target.value)}
                    />
                    <Divider/>
                </>
            }

            <CustomSelect defaultValue={questionTypeParams?.correctVariant} setCorrectAnswer={setValue}/>
            {
                questionTypeParams?.isImageQuiz &&
                <>
                    <TextField
                        size="small"
                        className="question__input"
                        label="Посилання на вірну відповідь*"
                        variant="outlined"
                        value={questionTypeParams?.linkToCorrectImage || ''}
                        onChange={e => setValue('linkToCorrectImage', e.target.value)}
                    />
                    <Divider/>
                </>
            }
        </div>
    );
};

export default Quiz;
