import React from 'react'
import { asyncReducerIds } from '../../store/redux/utils/reduxUtils';
import MultiWidgets from '../multi-redux/MultiWidgets';

const ReduxWidgetContainer: React.FC = () => {
    const widgetList = asyncReducerIds;

    return <div className="flex flex-col gap-4 border border-slate-700 !p-4">
        <div className="w-full bg-slate-900 !py-2 text-center text-2xl">Redux Widgets</div>
        <div className="w-full grid grid-cols-4 gap-4 !py-4">
            {widgetList.value.map((widget) => (<MultiWidgets key={widget} id={widget} stopOnUpdateLimit={false} />))}
        </div>
    </div>
}

export default ReduxWidgetContainer