import React from 'react'
import { Link } from 'react-router-dom'
import Screenshot from '../assets/settings_screenshot.webp'
import GithubIcon from '../assets/github.svg'

const Home: React.FC = () => {
    return <div className="flex justify-center items-center h-screen bg-slate-950 text-white">

        <a href='https://github.com/ChiragChrg/Signals-vs-Redux' target='_blank' title='GitHub Repo' className="absolute top-5 right-5">
            <img src={GithubIcon} alt="Settings Screenshot" className='w-10' />
        </a>

        <div className="w-full flex flex-col items-center gap-10">
            <h1 className='text-6xl font-black'>Signals vs Redux</h1>

            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center gap-4">
                    <div className="border border-slate-700 rounded !p-1 flex items-center gap-2">
                        <Link to="/redux" className='bg-slate-700 w-[150px] h-12 flex justify-center items-center rounded text-2xl'>Redux</Link>
                        <span>vs</span>
                        <Link to="/signal" className='bg-slate-700 w-[150px] h-12 flex justify-center items-center rounded text-2xl'>Signals</Link>
                    </div>
                    <div className="border border-slate-700 rounded !p-1 flex items-center gap-2">
                        <Link to="/multi-redux" className='bg-slate-700 w-[150px] h-12 flex justify-center items-center rounded text-2xl'>Multi Redux</Link>
                        <span>vs</span>
                        <Link to="/multi-signal" className='bg-slate-700 w-[150px] h-12 flex justify-center items-center rounded text-2xl'>Multi Signals</Link>
                    </div>
                </div>
                <Link to="/signal-redux" className='bg-slate-700 w-full h-12 flex justify-center items-center rounded text-2xl'>Signal vs Redux using the same Data Source</Link>
                <Link to="/incoming-signal" className='bg-slate-700 w-full h-12 flex justify-center items-center rounded text-2xl'>Signal - Update incoming data</Link>
            </div>

            <div className="flex flex-col items-center">
                <p>Use <a className='text-blue-500 font-black' target='_blank' href="https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi">React Developer Tools</a> browser extension to check and visualize re-render counts.</p>
                <p>Use <a className='text-blue-500 font-black' target='_blank' href="https://chromewebstore.google.com/detail/fps-extension/gdkkmimldhefhmmmlalioafomdlahcog">FPS extension</a> to check browser Render performance.</p>
            </div>

            <div className="max-w-[600px] flex flex-col items-center gap-4 border border-amber-400 !p-4 rounded-lg">
                <div className="flex flex-col gap-2 leading-7">
                    <div className="whitespace-nowrap text-amber-400 font-black">Tip : </div>
                    <p>Open the browser Inspect window &#8680; Profiler Tab &#8680; ⚙️ Icon &#8680; General Tab &#8680; Enable the <span className="bg-slate-700 !px-1 rounded-sm">✅ Highlight updates when components render</span> checkbox to visualize live re-renders.</p>
                </div>

                <img src={Screenshot} alt="Settings Screenshot" className='' />
            </div>
        </div>
    </div >
}

export default Home