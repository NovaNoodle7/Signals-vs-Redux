import { signal } from "@preact/signals-react";
import { WidgetsMap } from "./widgetSignal";

// Selected widget id to mutate specific signal
export const selectedWidget = signal<string>("");

// Update all incoming signals with new metric and isIncreasing values
export const updateAllIncomingSignal = (newMetric: number, newIsIncreasing: boolean) => {
    const allSignals = [...WidgetsMap.peek().values()];
    console.log("Incoming Signal All Update Running")

    for (const signal of allSignals) {
        const { metric, isIncreasing, updateCount, status } = signal;
        status.value = "pending";

        if (isIncreasing.peek()) {
            metric.value = newMetric >= 100.0 ? "100.0" : newMetric.toFixed(1);
            isIncreasing.value = newIsIncreasing;
        } else {
            metric.value = newMetric <= 0 ? "0.0" : newMetric.toFixed(1);
            isIncreasing.value = newIsIncreasing;
        }

        updateCount.value++;
        status.value = "complete";
    }
};

// Update a specific incoming signal by ID with new metric and isIncreasing values
export const updateIncomingSignal = (id: string, newMetric: number) => {
    const signal = WidgetsMap.peek().get(id);
    if (!signal) return;
    console.log("Incoming Signal Metric Update Running")

    const { metric, isIncreasing, updateCount, status } = signal;
    status.value = "pending";

    if (isIncreasing.peek()) {
        metric.value = newMetric >= 100.0 ? "100.0" : newMetric.toFixed(1);
        isIncreasing.value = newMetric >= 100.0 ? false : true;
    } else {
        metric.value = newMetric <= 0 ? "0.0" : newMetric.toFixed(1);
        isIncreasing.value = newMetric <= 0 ? true : false;
    }

    updateCount.value++;
    status.value = "complete";
};

// Update a specific incoming signal isIncreasing value by ID
export const updateIncomingIsIncreasing = (id: string, newIsIncreasing: boolean) => {
    const signal = WidgetsMap.peek().get(id);
    if (!signal) return;
    console.log("Incoming Signal isIncreasing Update Running")

    const { isIncreasing, status } = signal;
    status.value = "pending";

    isIncreasing.value = newIsIncreasing;

    status.value = "complete";
}