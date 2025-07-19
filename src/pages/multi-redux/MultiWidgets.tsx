import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { WidgetStateType } from '../../store/redux/Slice/multiWidgetSliceFactory';
import { RootState } from '../../store/redux/store';
import { cleanupReduxWidgets } from '../../store/redux/utils/multiWidgetUtils';
import { endTimer } from '../../store/signal';

type MultiWidgetsProps = {
    id: string;
    stopOnUpdateLimit?: boolean;
}

type DynamicRootState = RootState & {
    [key: string]: unknown; // allow dynamic widget state
};

const MultiWidgets: React.FC<MultiWidgetsProps> = ({ id, stopOnUpdateLimit = true }) => {
    const widget = useSelector((state: DynamicRootState) => state[id] as WidgetStateType);
    const barRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef<HTMLDivElement>(null);

    console.log("Render Redux Mutil Widget")

    useEffect(() => {
        const value = widget?.metric || 0;

        if (stopOnUpdateLimit && widget?.updateCount >= 500) {
            cleanupReduxWidgets();
            endTimer();
        }

        if (barRef.current) {
            barRef.current.style.width = `${value}%`;
        }

        if (valueRef.current) {
            valueRef.current.innerHTML = `
                <span>🔄️${widget?.updateCount}</span>
                <span>${widget?.isIncreasing ? "🟢" : "🟠"}</span>
                <span class="w-[5ch] text-end font-bold">${widget?.metric}</span>
            `;
        }
    }, [widget, stopOnUpdateLimit])

    return <div className="flex flex-col gap-1 w-full h-fit bg-slate-700">
        <div className="w-full h-8 bg-slate-500 relative">
            <div
                ref={barRef}
                className={`h-full bg-amber-400`}
                style={{ width: `0%`, transform: 'translateZ(0)', willChange: 'width, transform' }}
            ></div>
            <span className='absolute top-0 text-black'>{id}</span>
        </div>

        <div className="text-white flex justify-between" style={{ transform: 'translateZ(0)', willChange: 'width, transform' }} ref={valueRef}>
            {/* Render using Ref */}
        </div>
    </div>
}

export default MultiWidgets