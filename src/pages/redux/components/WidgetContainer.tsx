import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { widgetActions } from '../../../store/redux'
import Widget from './Widget'

const WidgetContainer: React.FC = () => {
  const [widgetCount, setWidgetCount] = useState<number>(100);
  const [intervalTime, setIntervalTime] = useState<number>(17);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Single Redux Update Running")
      dispatch(widgetActions.updateWidget());
    }, intervalTime);

    return () => clearInterval(interval);
  }, [dispatch, intervalTime])

  return <div className="border-t border-slate-400">
    <div className="w-full flex justify-between items-center !pb-2">
      <p><span className='font-bold text-blue-500'>{widgetCount}</span> widgets are reading <span className='font-bold text-blue-500'>1</span> Redux Slice which is updated every
        <span className='font-bold text-blue-500'> {intervalTime}ms </span> with Redux which causes re-renders when accessing the updated state using useSelector() hook</p>

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
      </div>
    </div>

    <div className="w-full grid grid-cols-6 lg:grid-cols-10 gap-8 !p-4">
      {Array.from({ length: widgetCount }).map((_, index) => (<Widget key={index} />))}
    </div>
  </div>
}

export default WidgetContainer