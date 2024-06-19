import { Check, Clear, QuestionMark } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useQuestionsData } from '../hooks/useQuestionData';
import { useQuestionsStore } from '../store/questionsStore';

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData();
  const reset = useQuestionsStore(state => state.reset);

  return (
    <footer style={{ marginTop: '1rem' }}>
      <Stack gap={2} direction="row" justifyContent="center" alignItems="start">
        <Check style={{ color: 'green' }} />
        {` ${correct}`}
        <Clear style={{ color: 'red' }} />
        {` ${incorrect}`}
        <QuestionMark style={{ color: 'purple' }} />
        {` ${unanswered}`}
      </Stack>
      <Stack>
        <Button onClick={() => reset()} color="secondary">
          Resetear Juego
        </Button>
      </Stack>
    </footer>
  );
};
