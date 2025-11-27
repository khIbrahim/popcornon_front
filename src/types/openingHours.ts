export type DayKey =
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";

export interface DayHours {
    open: string;
    close: string;
    closed: boolean;
}

export type WeekHours = Record<DayKey, DayHours>;