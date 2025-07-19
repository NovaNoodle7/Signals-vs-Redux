import { computed } from '@preact/signals-react'
import React, { useEffect } from 'react'
import MultiWidgets from './MultiWidgets';
import { cleanupSignalWidgets, createWidgets, intervalTime, widgetCount, WidgetsMap } from '../../store/signal/widgetSignal';
import { timeDiff } from '../../store/signal';

const MultiWidgetContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
        createWidgets();
        return () => cleanupSignalWidgets()
    }, [])

    const UpdateWidgetSettings = () => {
        createWidgets();
    }

    return <div className="border-t border-slate-400">
        <div className="w-full flex justify-between items-center gap-10 !pb-2">
            <p><span className='font-bold text-blue-500'>{widgetCount}</span> widgets are reading (<span className='font-bold text-blue-500'>{widgetCount}</span> x <span className='font-bold text-blue-500'>3</span> nested Signals) = <span className='font-bold text-blue-500'>{widgetCount.value * 3}</span> Signal states which are updated every
                <span className='font-bold text-blue-500'> {intervalTime}ms </span> with Signals resulting in ZERO re-renders by directly painting the DOM
                <br />
                Time taken to render widgets 500 times: <span className='font-bold text-blue-500'>{timeDiff}</span>
            </p>

            <div className="flex gap-4 items-end">
                <label>
                    <p>Set Interval <span className='text-slate-400 text-sm'> (Default: 17ms = 60FPS)</span></p>

                    <input
                        type='number'
                        value={intervalTime.value}
                        onChange={(e) => intervalTime.value = parseInt(e.target.value) || 0}
                        className='w-[250px] h-10 text-center text-2xl font-bold bg-slate-800 text-white' />
                </label>

                <label>
                    <p>Set Widget Count <span className='text-slate-400 text-sm'> (Default: 100)</span></p>

                    <input
                        type='number'
                        value={widgetCount.value}
                        onChange={(e) => widgetCount.value = parseInt(e.target.value) || 0}
                        className='w-[250px] h-10 text-center text-2xl font-bold bg-slate-800 text-white' />
                </label>

                <button
                    onClick={UpdateWidgetSettings}
                    className='w-[120px] h-10 text-center text-2xl font-bold bg-slate-600 text-white cursor-pointer'>
                    Update
                </button>
            </div>
        </div>

        {children}

    </div>
}

export default MultiWidgetContainer

export const WidgetList: React.FC = () => {
    const widgetList = computed(() => Array.from(WidgetsMap.value.keys()));

    return <div className="w-full grid grid-cols-6 lg:grid-cols-10 gap-8 !p-4">
        {widgetList.value.map((widget) => (<MultiWidgets key={widget} id={widget} />))}
    </div>
}