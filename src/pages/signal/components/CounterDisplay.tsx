import { counterSignal, incrementSignal, decrementSignal } from '../../../store/signal';

const CounterDisplay = () => {
    return (
        <div className="flex justify-between items-center gap-8 text-white">
            <button onClick={decrementSignal} className='w-[100px] h-12 bg-slate-700 flex justify-center items-center rounded cursor-pointer text-2xl'>Sub</button>
            <span className='text-2xl bg-slate-600 w-[60px] h-12 flex justify-center items-center rounded'>
                {counterSignal.value}
            </span>
            <button onClick={incrementSignal} className='w-[100px] h-12 bg-slate-700 flex justify-center items-center rounded cursor-pointer text-2xl'>Add</button>
        </div>
    );
};

export default CounterDisplay;
