import { computed } from '@preact/signals-react';
import React from 'react'
import { WidgetsMap } from '../../store/signal/widgetSignal';
import MultiWidgets from '../muilt-signal/MultiWidgets';

const SignalWidgetContainer: React.FC = () => {
    const widgetList = computed(() => Array.from(WidgetsMap.value.keys()));

    return <div className="flex flex-col gap-4 border border-slate-700 !p-4">
        <div className="w-full bg-slate-900 !py-2 text-center text-2xl">Signal Widgets</div>
        <div className="w-full grid grid-cols-4 gap-4 !py-4">
            {widgetList.value.map((widget) => (<MultiWidgets key={widget} id={widget} />))}
        </div>
    </div>
}

export default SignalWidgetContainer