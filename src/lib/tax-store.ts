import { useEffect, useState } from "react";
import {
  DEFAULT_DEDUCTIONS,
  DEFAULT_INCOME,
  type DeductionInputs,
  type IncomeInputs,
  type Regime,
  type TaxResult,
} from "./tax";

const KEY = "taxbuddy.state.v1";
const SAVED_KEY = "taxbuddy.saved.v1";
const FY_KEY = "taxbuddy.fy.v1";

export interface AppState {
  income: IncomeInputs;
  deductions: DeductionInputs;
  regime: Regime;
  lastResult?: TaxResult;
}

export interface SavedCalc {
  id: string;
  name: string;
  createdAt: number;
  fy: string;
  state: AppState;
  netTax: number;
}

const isBrowser = typeof window !== "undefined";

export function loadState(): AppState {
  if (!isBrowser) return { income: DEFAULT_INCOME, deductions: DEFAULT_DEDUCTIONS, regime: "new" };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { income: DEFAULT_INCOME, deductions: DEFAULT_DEDUCTIONS, regime: "new" };
}

export function saveState(state: AppState) {
  if (!isBrowser) return;
  localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("taxbuddy:state"));
}

export function useAppState(): [AppState, (s: AppState) => void] {
  const [state, setState] = useState<AppState>(() => loadState());
  useEffect(() => {
    const onChange = () => setState(loadState());
    window.addEventListener("taxbuddy:state", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("taxbuddy:state", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  const update = (s: AppState) => {
    setState(s);
    saveState(s);
  };
  return [state, update];
}

export function loadFY(): string {
  if (!isBrowser) return "FY 2025-26";
  return localStorage.getItem(FY_KEY) || "FY 2025-26";
}

export function saveFY(fy: string) {
  if (!isBrowser) return;
  localStorage.setItem(FY_KEY, fy);
  window.dispatchEvent(new Event("taxbuddy:fy"));
}

export function useFY(): [string, (fy: string) => void] {
  const [fy, setFy] = useState<string>(() => loadFY());
  useEffect(() => {
    const onChange = () => setFy(loadFY());
    window.addEventListener("taxbuddy:fy", onChange);
    return () => window.removeEventListener("taxbuddy:fy", onChange);
  }, []);
  return [fy, (v) => { setFy(v); saveFY(v); }];
}

export function loadSaved(): SavedCalc[] {
  if (!isBrowser) return [];
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function addSaved(calc: SavedCalc) {
  if (!isBrowser) return;
  const list = loadSaved();
  list.unshift(calc);
  localStorage.setItem(SAVED_KEY, JSON.stringify(list.slice(0, 20)));
  window.dispatchEvent(new Event("taxbuddy:saved"));
}

export function removeSaved(id: string) {
  if (!isBrowser) return;
  const list = loadSaved().filter((c) => c.id !== id);
  localStorage.setItem(SAVED_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("taxbuddy:saved"));
}

export function useSaved(): SavedCalc[] {
  const [list, setList] = useState<SavedCalc[]>(() => loadSaved());
  useEffect(() => {
    const onChange = () => setList(loadSaved());
    window.addEventListener("taxbuddy:saved", onChange);
    return () => window.removeEventListener("taxbuddy:saved", onChange);
  }, []);
  return list;
}