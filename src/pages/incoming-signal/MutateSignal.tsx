import React, { useRef, useState } from 'react'
import { WidgetsMap } from '../../store/signal/widgetSignal';
import { selectedWidget, updateIncomingIsIncreasing, updateIncomingSignal } from '../../store/signal/incomingSignal';
import { effect, signal } from '@preact/signals-react';

const isLocked = signal<boolean>(false);
const isPaused = signal<boolean>(false);

const MutateSignal: React.FC = () => {
    const selectedId = selectedWidget.value;
    const [uiValue, setUiValue] = useState<number>(0);

    const sliderRef = useRef<HTMLInputElement>(null);
    const numberRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLSpanElement>(null);

    // This signal is the UI value for the slider/number input
    // const uiValue = signal<number>(0);

    // Sync uiValue with the widget metric when not paused
    effect(() => {
        const widget = WidgetsMap.peek().get(selectedId);
        if (!widget) return;

        if (isLocked.value && widget.status.value === "complete") {
            isLocked.value = false;
        }
    });

    // Update DOM when signals change
    effect(() => {
        // const widget = WidgetsMap.peek().get(selectedId);
        const widget = WidgetsMap.value.get(selectedId);
        if (!widget) return;

        // Only update DOM from signal when not paused
        if (!isPaused.value && !isLocked.value) {
            const { metric } = widget;
            if (sliderRef.current) {
                sliderRef.current.value = String(metric.value);
            }
            if (numberRef.current) {
                numberRef.current.value = String(metric.value);
            }
        }
        // Always update status
        if (statusRef.current) {
            if (!selectedId) {
                statusRef.current.textContent = "Not Selected";
                statusRef.current.className = "text-red-400";
            } else if (widget?.status.value === "complete") {
                statusRef.current.textContent = " In Sync";
                statusRef.current.className = "text-green-400";
            } else {
                statusRef.current.textContent = " Updating...";
                statusRef.current.className = "text-amber-400";
            }
        }
    });

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        isLocked.value = true;
        setUiValue(parseFloat(e.target.value));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        isLocked.value = true;
        setUiValue(parseFloat(e.target.value));
    };

    // const handleUpdate = () => {
    //     updateIncomingSignal(selectedId, uiValue);
    // };

    const applyUserMetric = () => {
        if (selectedId) {
            updateIncomingSignal(selectedId, uiValue);
        }
    };

    const handlePause = () => { isPaused.value = true; };
    const handleResume = () => {
        isPaused.value = false;
        applyUserMetric();
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-end">
                <p>Select a Widget to Mutate incoming signal value</p>
                <p>
                    Widget is :
                    <span className='text-xl font-black text-amber-400'> {selectedId}</span>
                    &nbsp; is <span ref={statusRef}></span>
                </p>
            </div>
            <div className="flex gap-4 items-end">
                <label className='flex flex-col gap-2 border border-slate-700 rounded !p-2'>
                    <div className="flex justify-between items-center border-none border-slate-800 !py-2">
                        <p className='text-slate-400 text-sm'>Mutate Widget value</p>
                        {/* <button
                            onClick={handleUpdate}
                            className='w-[80px] h-6 text-center font-bold bg-slate-600 text-white cursor-pointer'>
                            Update
                        </button> */}
                    </div>
                    <div
                        onMouseDown={handlePause}
                        onTouchStart={handlePause}
                        onMouseUp={handleResume}
                        onTouchEnd={handleResume}
                        onFocus={handlePause}
                        onBlur={handleResume}
                        style={{
                            pointerEvents: selectedId.length === 0 ? "none" : "auto",
                            opacity: selectedId.length === 0 ? 0.5 : 1,
                        }}
                        className="flex gap-4 items-center">
                        <input
                            ref={sliderRef}
                            type='range'
                            min={0}
                            max={100}
                            step={1}
                            onChange={handleSliderChange}
                            className='w-[250px] h-5 text-center text-2xl font-bold rounded-xl bg-slate-800 text-white cursor-pointer'
                            defaultValue={uiValue}
                        />

                        <input
                            ref={numberRef}
                            type='number'
                            min={0}
                            max={100}
                            onChange={handleNumberChange}
                            className='w-[6ch] h-8 text-center text-2xl font-bold bg-slate-800 text-white !px-2'
                            defaultValue={uiValue}
                        />
                    </div>
                </label>

                <label className='flex flex-col gap-2 border border-slate-700 rounded !p-2 '>
                    <p className='text-slate-400 text-sm !py-1.5'>Toggle value Increment/Decrement</p>
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() => updateIncomingIsIncreasing(selectedId, true)}
                            className="bg-slate-600 !p-2 cursor-pointer">
                            🟢 Increase
                        </button>
                        <button
                            onClick={() => updateIncomingIsIncreasing(selectedId, false)}
                            className="bg-slate-600 !p-2 cursor-pointer">
                            🟠 Decrease
                        </button>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default MutateSignal;
