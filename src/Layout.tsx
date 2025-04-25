import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const Layout = () => {
  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <Header />
      <img
        src='./bg-emoji.jpg'
        style={{
          maskImage:
            'radial-gradient(circle, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%)',
          WebkitMaskImage:
            'radial-gradient(circle,  rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%)',
        }}
        className='w-full absolute inset-0 -z-2 opacity-60  h-screen  object-bottom-center object-cover '
      />
      <div className='bg-white w-full h-screen absolute inset-0 -z-1 opacity-10'></div>
      <main className='w-full z-50 bg-cover bg-center bg-no-repeat  bg-opacity-50 h-screen flex flex-col justify-center items-center'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
