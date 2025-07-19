import { createSlice } from '@reduxjs/toolkit';

export type WidgetStateType = {
    metric: string;
    isIncreasing: boolean;
    updateCount: number;
};

export const createWidgetSlice = (id: string, metricValue?: string) => {
    return createSlice({
        name: `widget/${id}`,
        initialState: {
            metric: metricValue ?? (Math.random() * 100.0).toFixed(1),
            isIncreasing: true,
            updateCount: 0
        } as WidgetStateType,
        reducers: {
            update: (state) => {
                const currentValue = parseFloat(state.metric) || 0;

                if (state.isIncreasing) {
                    const next = currentValue + 0.5;
                    if (next >= 100.0) {
                        state.metric = "100.0";
                        state.isIncreasing = false;
                    } else {
                        state.metric = next.toFixed(1);
                    }
                } else {
                    const next = currentValue - 0.5;
                    if (next <= 0.0) {
                        state.metric = "0.0";
                        state.isIncreasing = true;
                    } else {
                        state.metric = next.toFixed(1);
                    }
                }
                state.updateCount++;
            }
        },
    });
};

export type CreateWidgetType = ReturnType<typeof createWidgetSlice>;