'use client'
import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

export interface UseThemeResult {
	theme: Theme | undefined;
	toggleTheme: () => void;
}

export const useTheme = (): UseThemeResult => {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleTheme = () => {
		const newTheme: Theme = theme === Theme.dark ? Theme.light : Theme.dark;
		setTheme!(newTheme);
		if (typeof window !== undefined) {
			localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
		}
	};
	return { theme, toggleTheme };
};
