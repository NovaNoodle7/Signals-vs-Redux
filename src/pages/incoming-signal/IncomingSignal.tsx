import React from 'react'
import Header from '../signal/components/Header'
import IncomingSignalContainer, { WidgetList } from './IncomingSignalContainer'

const IncomingSignal: React.FC = () => {
    return <div className="w-full h-screen !p-10 flex flex-col gap-8">
        <Header title='Signals - Update Incoming data' disableCounter />
        <IncomingSignalContainer>
            <WidgetList />
        </IncomingSignalContainer>
    </div>
}

export default IncomingSignal