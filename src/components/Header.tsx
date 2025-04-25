import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, logOut } = useAuth();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const signOut = async () => {
    try {
      await logOut();
      setIsOpenModal(false);
      navigate('/');
    } catch (e) {
      alert('Error al hacer log out');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setIsOpenModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='fixed top-0 right-0 py-4 px-8'>
      {user?.photoURL && (
        <div className='relative' ref={avatarRef}>
          <button onClick={openModal} className='cursor-pointer'>
            <img
              src={user.photoURL}
              alt='Avatar del usuario'
              className='w-10 h-10 rounded-full '
            />
          </button>
          {isOpenModal && (
            <div className='bg-white/10 shadow-md rounded-md py-1 h-auto w-32 lg:w-40 absolute right-0 items-end justify-center flex'>
              <Button variant='link' onClick={signOut}>
                Cerrar sesión
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
