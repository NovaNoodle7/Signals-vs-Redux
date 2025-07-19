import { computed } from '@preact/signals-react'
import React, { useEffect } from 'react'
import { cleanupSignalWidgets, createWidgets, intervalTime, widgetCount, WidgetsMap } from '../../store/signal/widgetSignal'
import IncomingSignalWidget from './IncomingSignalWidget'
import MutateSignal from './MutateSignal'

type IncomingSignalContainerProps = {
    children?: React.ReactNode
}

const IncomingSignalContainer: React.FC<IncomingSignalContainerProps> = ({ children }) => {
    useEffect(() => {
        createWidgets();

        return () => cleanupSignalWidgets()
    }, [])

    return <div className="border-t border-slate-400">
        <div className="w-full flex justify-between items-center gap-10 !pb-2">
            <MutateSignal />

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
                    onClick={() => createWidgets()}
                    className='w-[120px] h-10 text-center text-2xl font-bold bg-slate-600 text-white cursor-pointer'>
                    Update
                </button>
            </div>
        </div>

        {children}

    </div>
}

export default IncomingSignalContainer

export const WidgetList: React.FC = () => {
    const widgetList = computed(() => Array.from(WidgetsMap.value.keys()));

    return <div className="w-full grid grid-cols-6 lg:grid-cols-10 gap-8 !p-4">
        {widgetList.value.map((widget) => (<IncomingSignalWidget key={widget} id={widget} />))}
    </div>
}