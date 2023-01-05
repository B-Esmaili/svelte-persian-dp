import type { ThemeValue } from "./store";

export enum DayType {
    PrevMonth,
    CurrentMonth,
    NextMonth
}

export interface Day {
    value: number;
    type: DayType;
}

export interface DPOptions{
    theme : ThemeValue
}