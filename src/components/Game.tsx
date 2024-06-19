import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import {ArrowBackIosNew, ArrowForwardIos} from '@mui/icons-material'
import { useQuestionsStore } from '../store/questionsStore';
import { Question as QuestionType } from '../types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  gradientDark,
  //   atomOneDarkReasonable,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Footer } from './Footer';

// función que se crea una sola vez
const getBackgroundColor = (info: QuestionType, answerIndex: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  if (userSelectedAnswer == null) return 'transparent';

  if (answerIndex === userSelectedAnswer && answerIndex !== correctAnswer)
    return 'red';

  if (answerIndex === correctAnswer) return 'green';
};

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: '#222', textAlign: 'left', padding: 2, marginTop: 4 }}>
      <Typography variant="h5">{info.question}</Typography>

      <SyntaxHighlighter
        language="javascript"
        style={gradientDark}
        customStyle={{ borderRadius: 5 }}>
        {info.code}
      </SyntaxHighlighter>

      <List
        disablePadding
        sx={{
          bgcolor: '#333',
          borderRadius: 1,
          overflow: 'hidden',
        }}>
        {info.answers.map((item, index) => (
          <ListItem disablePadding key={index} divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}>
              <ListItemText primary={item} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions);
  const currentQuestion = useQuestionsStore(state => state.currentQuestion);
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    state => state.goPreviousQuestion
  );

  console.log(questions);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        justifyContent="center"
        alignItems="center">
        <IconButton
          disabled={currentQuestion === 0}
          onClick={goPreviousQuestion}
          color="secondary">
          <ArrowBackIosNew />
        </IconButton>
        <Typography variant="h4">{`${currentQuestion + 1} / ${questions.length}`}</Typography>
        <IconButton
          disabled={currentQuestion >= questions.length - 1}
          onClick={goNextQuestion}
          color="secondary">
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};

export default Game;
