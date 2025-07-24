import React from 'react'
import { useSelector } from 'react-redux'
import { SEL_Mouse } from '../../../store/redux'

const MousePosition: React.FC = () => {
    const mouse = useSelector(SEL_Mouse)

    return <div className="w-[200px] flex items-center justify-center gap-4">
        <span className="text-2xl font-bold">X: {mouse.x}</span>
        <span className="text-2xl font-bold">Y: {mouse.y}</span>
    </div>
}

export default MousePosition