import React, { useEffect } from 'react'
import Header from '../redux/components/Header'
import ReduxProvider from '../../providers/ReduxProvider'
import SignalWidgetContainer from './SignalWidgetContainer'
import ReduxWidgetContainer from './ReduxWidgetContainer'
import { intervalTime, widgetCount, WidgetsMap } from '../../store/signal/widgetSignal'
import { cleanupAllWidgets, createCombinedWidgets, enableCombinedState, startSynchronizedUpdates } from '../../store/combinedState'

// Create widgets for both Signal and Redux
const createAllWidgets = () => {
    createCombinedWidgets();

    startSynchronizedUpdates(intervalTime.value);
}

const SignalRedux: React.FC = () => {
    useEffect(() => {
        enableCombinedState.value = true;

        if (WidgetsMap.value.size === 0) {
            createAllWidgets();
        }

        return () => {
            cleanupAllWidgets();
            enableCombinedState.value = false;
        }
    }, [])

    return <div className="w-full h-screen !p-10 flex flex-col gap-8">
        <Header title='Signal vs Redux - Single Data Source' disableCounter disableTheme />

        <div className="border-t border-slate-400 w-full flex justify-between items-center gap-10 !pb-2">
            <p><span className='font-bold text-blue-500'>{widgetCount}</span> widgets are reading (<span className='font-bold text-blue-500'>{widgetCount}</span> x <span className='font-bold text-blue-500'>3</span> nested Signals) = <span className='font-bold text-blue-500'>{widgetCount.value * 3}</span> Signal states which are updated every
                <span className='font-bold text-blue-500'> {intervalTime}ms </span> with Signals resulting in ZERO re-renders by directly painting the DOM</p>

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
                    onClick={() => createAllWidgets()}
                    className='w-[120px] h-10 text-center text-2xl font-bold bg-slate-600 text-white cursor-pointer'>
                    Update
                </button>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
            <SignalWidgetContainer />

            <ReduxProvider>
                <ReduxWidgetContainer />
            </ReduxProvider>
        </div>
    </div>
}

export default SignalRedux