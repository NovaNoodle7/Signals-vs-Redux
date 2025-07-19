import { useDispatch, useSelector } from 'react-redux';
import { SEL_Theme, themeActions } from '../../../store/redux';

const ThemeToggle = () => {
    const theme = useSelector(SEL_Theme);
    const dispatch = useDispatch();

    const toggleTheme = () => dispatch(themeActions.toggleTheme());

    return (
        <button onClick={toggleTheme} className="w-[100px] flex justify-center items-center border-2 border-slate-500 rounded !p-2 cursor-pointer">
            {theme === 'dark' ? 'Dark' : 'Light'}
        </button>
    );
};

export default ThemeToggle;
