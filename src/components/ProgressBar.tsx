import * as Progress from '@radix-ui/react-progress';

function ProgressBar({ value }: { value: number }) {
  return (
    <div className='relative w-[260px] h-6'>
      <Progress.Root
        className='absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full overflow-hidden'
        value={value}
      >
        <Progress.Indicator
          className='bg-emerald-500 h-full transition-transform duration-300 ease-in-out'
          style={{ transform: `translateX(-${100 - value}%)` }}
        />
      </Progress.Root>
      <span className='absolute w-full h-full flex items-center justify-center text-sm font-medium text-white z-10'>
        {value} PT
      </span>
    </div>
  );
}

export default ProgressBar;
