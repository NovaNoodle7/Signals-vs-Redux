import React from 'react'
import Header from '../signal/components/Header'
import MultiWidgetContainer, { WidgetList } from './MultiWidgetContainer'
import ReduxProvider from '../../providers/ReduxProvider'

const MultiRedux: React.FC = () => {
    return <ReduxProvider>
        <div className="w-full h-screen !p-10 flex flex-col gap-8">
            <Header title='Multi Redux' disableCounter />
            <MultiWidgetContainer>
                <WidgetList />
            </MultiWidgetContainer>
        </div>
    </ReduxProvider>
}

export default MultiRedux