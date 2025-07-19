import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Redux from './pages/redux/Redux'
import Signal from './pages/signal/Signal'
import MultiSignal from './pages/muilt-signal/MultiSignal'
import MultiRedux from './pages/multi-redux/MultiRedux'
import SignalRedux from './pages/signal-redux/SignalRedux'
import IncomingSignal from './pages/incoming-signal/IncomingSignal'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redux" element={<Redux />} />
        <Route path="/signal" element={<Signal />} />
        <Route path="/multi-signal" element={<MultiSignal />} />
        <Route path="/multi-redux" element={<MultiRedux />} />
        <Route path="/signal-redux" element={<SignalRedux />} />
        <Route path="/incoming-signal" element={<IncomingSignal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App