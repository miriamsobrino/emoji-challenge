import { useState } from 'react';
import Button from '../components/Button';
import { MOVIES } from '../data/data';
import ProgressBar from '../components/ProgressBar';
import { BiSolidTrophy } from 'react-icons/bi';
import { useAuth } from '../context/AuthContext';
import useUserScore from '../hooks/useUserScore';
import { useNavigate } from 'react-router-dom';
import { FaArrowRotateRight } from 'react-icons/fa6';
function Home() {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [actualScore, setActualScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameFinish, setIsGameFinish] = useState(false);
  const [isErrorAnswer, setIsErrorAnswer] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const currentMovie = MOVIES[currentMovieIndex];
  const totalMovies = MOVIES.length;
  const totalScore = totalMovies * 5;
  const { user } = useAuth();
  const { userScore, updateScore } = useUserScore(user);

  const navigate = useNavigate();

  const normalizeString = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
  const validAnswers = Array.isArray(currentMovie.answers)
    ? currentMovie.answers
    : [currentMovie.answer];

  const isCorrect = validAnswers.some(
    (ans) =>
      typeof ans === 'string' &&
      normalizeString(ans.toLowerCase()) ===
        normalizeString(userAnswer.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isCorrect) {
      const newScore = actualScore + 5;
      setActualScore(newScore);
      setIsCorrectAnswer(true);
      if (user?.uid && newScore > userScore) {
        try {
          await updateScore(newScore);
        } catch (err) {
          console.error('Error actualizando récord en Firebase:', err);
        }
      }
    } else {
      setIsErrorAnswer(true);
      setIsCorrectAnswer(false);
    }

    if (currentMovieIndex < totalMovies - 1) {
      setTimeout(() => {
        setIsErrorAnswer(false);
        setIsCorrectAnswer(false);
        setCurrentMovieIndex((prevIndex) => prevIndex + 1);
      }, 500);
      setUserAnswer('');
    } else {
      const finalScore = isCorrect ? actualScore + 5 : actualScore;

      setTimeout(async () => {
        setIsGameFinish(true);
        setIsGameActive(false);
        setIsErrorAnswer(false);
        setIsCorrectAnswer(false);

        if (user?.uid && finalScore > userScore) {
          try {
            await updateScore(finalScore);
          } catch (err) {
            console.error(
              'Error actualizando la mejor puntuación en Firebase:',
              err
            );
          }
        }
      }, 500);
      setUserAnswer('');
    }
  };

  const resetGame = () => {
    setIsGameActive(true);
    setIsGameFinish(false);
    setCurrentMovieIndex(0);
    setActualScore(0);
    setUserAnswer('');
  };

  return (
    <div className='flex flex-col items-center justify-center text-center gap-2 relative'>
      {isGameActive && (
        <>
          <h2 className='text-2xl text-gray-800 font-bold'>
            Adivina la película ({currentMovieIndex + 1}/{totalMovies})
          </h2>
        </>
      )}
      {isCorrectAnswer && (
        <div className='bg-emerald-400 w-8 h-8 flex text-center  items-center justify-center rounded-full drop-shadow-md drop-shadow-emerald-400/60 absolute top-0 right-0 animate-float-up '>
          <span className='text-emerald-50 font-semibold'>+5</span>
        </div>
      )}
      <div
        className={`text-center  w-[380px] flex flex-col gap-6 items-center justify-center ${
          isCorrectAnswer ? 'border-2 border-emerald-400' : ''
        } ${
          isErrorAnswer
            ? 'border-2 border-red-500 animate-shake animate-duration-300'
            : ''
        }  ${
          isGameFinish || !isGameActive ? '' : 'bg-amber-50 shadow-md'
        } p-10 rounded-md  `}
      >
        {isGameActive && (
          <>
            <div className='flex gap-1 items-center'>
              <ProgressBar value={actualScore} />{' '}
              <BiSolidTrophy size={24} className='text-amber-400' />
              <span className=' bg-amber-400 px-2 py-1 rounded-full font-semibold flex items-center text-white justify-center text-sm'>
                {userScore}
              </span>
            </div>
            <h3 className='text-5xl lg:text-4xl py-4'>{currentMovie.emojis}</h3>
            <form className='flex gap-2 ' onSubmit={handleSubmit}>
              <input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder='Título de la película...'
                className='border-2 border-gray-400 w-[230px] rounded-md px-2 py-1 focus:outline-gray-800  '
              />
              <Button rounded='md' type='submit'>
                Enviar
              </Button>
            </form>
          </>
        )}
      </div>
      {isGameFinish && !isGameActive && (
        <span className='text-2xl font-semibold mb-2 '>
          Juego terminado. <br /> Tu puntuación fue: {actualScore} /{' '}
          {totalScore}
        </span>
      )}
      <div className={`${isGameActive || isGameFinish ? 'hidden' : ''}`}>
        <h2 className='text-2xl text-gray-800 font-bold mb-2'>Instrucciones</h2>
        <div className=' w-[360px] lg:w-[420px] text-base flex flex-col justify-center items-center gap-2 text-balance bg-amber-50 rounded-md py-4 mb-2 '>
          <p>
            Deberás adivinar el título de 20 películas basándote en un conjunto
            de emojis.
          </p>
          <p>Por cada respuesta correcta, ganarás 5 puntos.</p>
          <p>
            El objetivo es acumular la mayor cantidad de puntos posible, con una
            puntuación máxima de 100 puntos al final del juego.
          </p>
          <p className='mb-2 font-bold'>
            ¡Pon a prueba tu memoria cinematográfica y demuestra tus
            conocimientos en películas!
          </p>
        </div>
      </div>
      <Button onClick={resetGame} className={`${isGameActive ? 'hidden' : ''}`}>
        {isGameFinish ? (
          <>
            <FaArrowRotateRight /> Jugar de nuevo
          </>
        ) : (
          'Empezar a jugar '
        )}
      </Button>
      <Button variant='link' onClick={() => navigate('/ranking')}>
        Ver ranking
      </Button>
    </div>
  );
}

export default Home;
