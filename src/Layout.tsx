import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  return (
    <div className='relative w-full min-h-[100dvh] overflow-hidden'>
      <Header />
      <img
        src='./bg-emoji.jpg'
        className='w-full absolute inset-0 -z-2 opacity-60 mask-radial-from-1.5 min-h-[100dvh]  object-bottom-center object-cover '
      />
      <div className='bg-white w-full min-h-[100dvh] absolute inset-0 -z-1 opacity-10'></div>
      <main className='w-full z-50 bg-cover bg-center bg-no-repeat  bg-opacity-50 min-h-[100dvh] flex flex-col justify-center items-center'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
