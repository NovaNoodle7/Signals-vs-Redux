import React from 'react'
import { mousePositionSignal } from '../../../store/signal'

const MousePosition: React.FC = () => {
    return <div className="w-[200px] flex items-center justify-center gap-4">
        <span className="text-2xl font-bold">X: {mousePositionSignal.value.x}</span>
        <span className="text-2xl font-bold">Y: {mousePositionSignal.value.y}</span>
    </div>
}

export default MousePosition