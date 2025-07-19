import { effect } from '@preact/signals-react';
import React, { useRef } from 'react'
import { WidgetsMap } from '../../store/signal/widgetSignal';

type MultiWidgetsProps = {
    id: string;
}

const MultiWidgets: React.FC<MultiWidgetsProps> = ({ id }) => {
    const widget = WidgetsMap.value.get(id);
    const barRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef<HTMLDivElement>(null);

    console.log("Render Signal Mutil Widget")

    effect(() => {
        const value = widget?.metric.value || 0;

        if (!widget) return;

        if (barRef.current) {
            barRef.current.style.width = `${value}%`;
        }

        if (valueRef.current) {
            valueRef.current.innerHTML = `
                <span>🔄️${widget?.updateCount.value}</span>
                <span>${widget?.isIncreasing.value ? "🟢" : "🟠"}</span>
                <span class="w-[5ch] text-end font-bold">${widget?.metric.value}</span>
            `;
        }
    })

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