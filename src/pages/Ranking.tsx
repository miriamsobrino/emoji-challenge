import { useEffect, useState } from 'react';
import { getUsers } from '../services/firebaseServices';
import { UserProps } from '../types/types';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function Ranking() {
  const [users, setUsers] = useState<UserProps[]>([]);
  const navigate = useNavigate();
  const getIndexClass = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-amber-400';
      case 1:
        return 'bg-amber-500';
      case 2:
        return 'bg-amber-600';
      default:
        return 'bg-gray-300';
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const sortedUsers = await getUsers();
        setUsers(sortedUsers);
      } catch (err) {
        console.error('Error al cargar los usuarios:', err);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className='justify-center items-center gap-4 flex flex-col'>
      <h2 className='text-2xl text-gray-800 font-bold text-center'>
        Ranking Puntuaciones
      </h2>
      <div className='flex justify-center bg-amber-50 w-[300px] mx-auto rounded-md py-3 '>
        {users.length > 0 ? (
          <ul>
            {users
              .filter((user) => user.score > 0)
              .map((user, index) => (
                <li
                  key={user.id}
                  className='flex items-start justify-start gap-2 py-1 px-4'
                >
                  <span
                    className={` px-2 rounded-full ${getIndexClass(index)}`}
                  >
                    {index + 1}
                  </span>
                  <div className='flex flex-col text-left w-full'>
                    <span>{user.username}</span>
                    <span className='font-bold'>{user.score} puntos</span>
                  </div>
                </li>
              ))
              .slice(0, 10)}
          </ul>
        ) : (
          <p className='text-center'>
            El ranking está vacío por ahora.
            <br />
            ¿Te animas a empezar?
          </p>
        )}
      </div>
      <Button onClick={() => navigate('/home')}>Volver al juego</Button>
    </div>
  );
}

export default Ranking;
