import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

function Welcome() {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);
  const signIn = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      alert('Error al iniciar sesión con Google');
    }
  };
  return (
    <div className='w-full  h-screen flex flex-col justify-center items-center gap-3 '>
      <h1 className='text-red-500 text-4xl lg:text-5xl font-bold'>
        {' '}
        🎯EmojiChallenge
      </h1>
      <h2 className='font-semibold text-lg lg:text-xl text-gray-800'>
        Adivina las películas...¡solo con emojis!
      </h2>
      <div className='flex gap-2'>
        <Button onClick={signIn}>Jugar con cuenta</Button>
        <Button variant='secondary'>Jugar como invitado</Button>
      </div>
      <span className='text-neutral-400 text-xs lg:text-sm  text-center'>
        Si juegas como invitado, no se guardará tu historial de puntuaciones.
      </span>
    </div>
  );
}

export default Welcome;
