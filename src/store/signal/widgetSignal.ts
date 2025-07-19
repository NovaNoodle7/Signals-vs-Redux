import { Signal, signal } from "@preact/signals-react";
import { enableCombinedState } from "../combinedState";
import { endTimer, startTimer } from ".";

export type WidgetType = {
    metric: Signal<string>;
    isIncreasing: Signal<boolean>;
    updateCount: Signal<number>;
    status: Signal<"pending" | "complete">;
}

// Initialize the WidgetsMap and signals
export const WidgetsMap = signal(new Map<string, WidgetType>());
export const widgetCount = signal(300);
export const intervalTime = signal(17);

// Create a signal for each widget and store it in the map
export const createWidgets = () => {
    cleanupSignalWidgets();

    WidgetsMap.value.clear();
    const map = new Map<string, WidgetType>();

    for (let i = 0; i < widgetCount.peek(); i++) {
        map.set(`ID-${i}`, {
            metric: signal((Math.random() * 100.0).toFixed()),
            isIncreasing: signal(true),
            updateCount: signal(0),
            status: signal("complete")
        });
    }

    WidgetsMap.value = map;
    startTimer();
    updateSingleSignal();
}

// Update a specific widget's signal by ID
export const updateWidget = (id: string) => {
    console.log("Multi Signals Update Running")

    const widget = WidgetsMap.peek().get(id);
    if (!widget) return;

    const { metric, isIncreasing, updateCount, status } = widget;
    if (status.peek() === "pending") return; // Skip if already pending

    const currentValue = parseFloat(metric.peek()) || 0;

    if (isIncreasing.peek()) {
        const next = currentValue + 0.5;
        metric.value = next >= 100.0 ? "100.0" : next.toFixed(1);
        isIncreasing.value = next >= 100.0 ? false : true;
    } else {
        const next = currentValue - 0.5;
        metric.value = next <= 0 ? "0.0" : next.toFixed(1);
        isIncreasing.value = next <= 0 ? true : false;
    }

    updateCount.value++;

    if (updateCount.peek() >= 500) {
        cleanupSignalWidgets();
        endTimer();
    }
}

// Update all widgets at the specified interval
let intervalId: number | null = null;
export const updateSingleSignal = () => {
    // If combined state is enabled, do not start the interval for multi signal widgets
    if (enableCombinedState.peek()) return;

    if (intervalId) clearInterval(intervalId);

    const keys = [...WidgetsMap.value.keys()];
    if (keys.length === 0) return;

    intervalId = setInterval(() => {
        const keys = [...WidgetsMap.peek().keys()];
        for (const id of keys) updateWidget(id);
    }, intervalTime.value);

    return () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    };
};

// Cleanup function to clear the interval and reset the map
export const cleanupSignalWidgets = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
};