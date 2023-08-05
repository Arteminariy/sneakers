'use client';
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

let defaultTheme: Theme | undefined = undefined;

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	useEffect(() => {
		defaultTheme =
			(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) ||
			Theme.light;
	}, []);
	const [theme, setTheme] = useState<Theme | undefined>(defaultTheme);

	const defaultProps = useMemo(
		() => ({
			theme: theme,
			setTheme: setTheme,
		}),
		[theme],
	);

	return (
		<ThemeContext.Provider value={defaultProps}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
