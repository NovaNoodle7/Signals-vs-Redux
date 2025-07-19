import { useSelector } from 'react-redux';
import { SEL_Widget } from '../../../store/redux';
import { useEffect, useRef } from 'react';

const Widget: React.FC = () => {
    const barRef = useRef<HTMLDivElement>(null);
    const value = useSelector(SEL_Widget); // This will cause re-render

    console.log("Render Redux Widget")

    useEffect(() => {
        if (barRef.current) {
            barRef.current.style.width = `${value}%`;
        }
    }, [value])

    return <div className="flex gap-1 w-full h-fit bg-slate-700">
        <div className="w-full bg-slate-500">
            <div
                className="h-full bg-amber-400"
                style={{ width: `${value}%` }}
            ></div>
        </div>

        <span className="w-[6ch] text-white text-center">{value}</span>
    </div>
}

export default Widget