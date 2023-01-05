import { writable } from "svelte/store";

export type DPColor = string

export interface ThemeValue {
    primaryColor : DPColor;
    secondaryColor : DPColor;
}

export interface DPStore{
    theme : ThemeValue
}

export const store = writable<DPStore>({
    theme : {
        primaryColor:"#5371ff",
        secondaryColor: "#f5f5f5"
    }
});