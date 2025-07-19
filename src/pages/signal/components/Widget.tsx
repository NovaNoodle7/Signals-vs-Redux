import { useRef } from 'react';
import { widgetSignal } from '../../../store/signal'
import { effect } from '@preact/signals-react';

const Widget: React.FC = () => {
    const barRef = useRef<HTMLDivElement>(null);

    console.log("Render Signal Widget")

    effect(() => {
        const value = widgetSignal.value

        if (barRef.current) {
            barRef.current.style.width = `${value}%`;
        }
    })

    return <div className="flex gap-1 w-full h-fit bg-slate-700">
        <div className="w-full bg-slate-500">
            <div
                ref={barRef}
                className="h-full bg-amber-400"
                style={{ width: '0%' }}
            ></div>
        </div>

        <span className="w-[6ch] text-white text-center">{widgetSignal}</span>
    </div>
}

export default Widget