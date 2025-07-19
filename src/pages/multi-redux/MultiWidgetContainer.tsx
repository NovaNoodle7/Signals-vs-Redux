import React, { useEffect, useState } from 'react'
import MultiWidgets from './MultiWidgets';
import { cleanupReduxWidgets, createWidgets } from '../../store/redux/utils/multiWidgetUtils';
import { asyncReducerIds } from '../../store/redux/utils/reduxUtils';
import { timeDiff } from '../../store/signal';

const MultiWidgetContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [widgetCount, setWidgetCount] = useState<number>(300);
    const [intervalTime, setIntervalTime] = useState<number>(17);

    useEffect(() => {
        createWidgets(widgetCount, intervalTime);

        return () => cleanupReduxWidgets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const UpdateWidgetSettings = () => {
        createWidgets(widgetCount, intervalTime);
    }

    return <div className="border-t border-slate-400">
        <div className="w-full flex justify-between items-center !pb-2">
            <p><span className='font-bold text-blue-500'>{widgetCount}</span> widgets are reading <span className='font-bold text-blue-500'>{widgetCount}</span> Redux Slices which are updated every <span className='font-bold text-blue-500'> {intervalTime}ms </span> which causes re-renders when accessing the updated state using useSelector() hook
                <br />
                Time taken to render widgets 500 times: <span className='font-bold text-blue-500'>{timeDiff}</span>
            </p>

            <div className="flex gap-4 items-end">
                <label>
                    <p>Set Interval <span className='text-slate-400 text-sm'> (Default: 17ms = 60FPS)</span></p>

                    <input
                        type='number'
                        value={intervalTime}
                        onChange={(e) => setIntervalTime(Number(e.target.value))}
                        className='w-[250px] h-10 text-center text-2xl font-bold bg-slate-800 text-white' />
                </label>

                <label>
                    <p>Set Widget Count <span className='text-slate-400 text-sm'> (Default: 100)</span></p>

                    <input
                        type='number'
                        value={widgetCount}
                        onChange={(e) => setWidgetCount(Number(e.target.value))}
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

    </div >
}

export default MultiWidgetContainer

export const WidgetList: React.FC = () => {
    const widgetList = asyncReducerIds;

    return <div className="w-full grid grid-cols-6 lg:grid-cols-10 gap-8 !p-4">
        {widgetList.value.map((widget) => (<MultiWidgets key={widget} id={widget} />))}
    </div>
}