import './App.css';
import { Container, Stack, Typography } from '@mui/material';
import { JavaScriptLogo } from './components/icons/JavaScriptLogo';
import { useQuestionsStore } from './store/questionsStore';
import Start from './components/Start';
import Game from './components/Game';

function App() {
  const questions = useQuestionsStore((state) => state.questions);
  console.log(questions);
  
  
  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction={'row'}
          gap={2}
          alignItems="center"
          justifyContent="center">
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            Javascript Quizz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}


      </Container>
    </main>
  );
}

export default App;
