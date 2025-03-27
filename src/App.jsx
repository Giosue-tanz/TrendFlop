import { useState, useEffect } from 'react';
import questionsData from './questions.json';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const questionsPerGame = 10; // Numero massimo di domande per partita

  // Funzione per mescolare un array (Fisher-Yates shuffle)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Inizializza il gioco con domande casuali
  useEffect(() => {
    const shuffledQuestions = shuffleArray(questionsData);
    const selectedQuestions = shuffledQuestions.slice(0, questionsPerGame);
    setQuestions(selectedQuestions); // Corretto qui
  }, []);

  // Controlla la risposta
  const checkAnswer = (userChoice) => {
    if (questions.length === 0) return;
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer.trim().toLowerCase();
    const resultText = currentQuestion.result;

    if (userChoice === correctAnswer) {
      setScore(score + 1);
      setResult(resultText + ' Risposta corretta!');
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        setGameOver(true);
        setResult(`Complimenti! Hai finito tutte le domande. Punteggio: ${score + 1}/${questions.length}`);
      }
    } else {
      setGameOver(true);
      setResult(`${resultText} Sbagliato! Partita finita. Punteggio: ${score}/${questions.length}`);
    }
  };

  // Ricomincia il gioco
  const restartGame = () => {
    const shuffledQuestions = shuffleArray(questionsData);
    const selectedQuestions = shuffledQuestions.slice(0, questionsPerGame);
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setResult('');
    setGameOver(false);
  };

  return (
    <div className="app">
      <h1>Trend or Flop?</h1>
      {!gameOver && questions.length > 0 && (
        <>
          <p>Domanda {currentQuestionIndex + 1}/{questions.length}</p>
          <p>{questions[currentQuestionIndex].text}</p>
          <div className="buttons">
            <button onClick={() => checkAnswer('trend')}>Trend</button>
            <button onClick={() => checkAnswer('flop')}>Flop</button>
          </div>
        </>
      )}
      {gameOver && (
        <div>
          <p>{result}</p>
          <button onClick={restartGame}>Riprova</button>
        </div>
      )}
      {!gameOver && <p>{result}</p>}
      <p>Punteggio: <span>{score}</span></p>
    </div>
  );
}

export default App;