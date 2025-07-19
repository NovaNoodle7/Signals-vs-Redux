import React from 'react'
import Header from './components/Header'
import WidgetContainer, { WidgetList } from './components/WidgetContainer'

const Signal: React.FC = () => {
    return <div className="w-full h-screen !p-10 flex flex-col gap-8">
        <Header />
        <WidgetContainer>
            <WidgetList />
        </WidgetContainer>
    </div>
}

export default Signal