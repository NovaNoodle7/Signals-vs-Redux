import React from 'react'
import Header from '../signal/components/Header'
import MultiWidgetContainer, { WidgetList } from './MultiWidgetContainer'

const MultiSignal: React.FC = () => {
    return <div className="w-full h-screen !p-10 flex flex-col gap-8">
        <Header title='Multi Signals' disableCounter />
        <MultiWidgetContainer>
            <WidgetList />
        </MultiWidgetContainer>
    </div>
}

export default MultiSignal