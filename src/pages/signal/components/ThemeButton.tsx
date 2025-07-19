import { themeSignal, toggleThemeSignal } from '../../../store/signal';

const ThemeToggle = () => {
    return (
        <button onClick={toggleThemeSignal} className="w-[100px] flex justify-center items-center border-2 border-slate-500 rounded !p-2 cursor-pointer">
            {themeSignal.value === 'dark' ? 'Dark' : 'Light'}
        </button>
    );
};

export default ThemeToggle;
