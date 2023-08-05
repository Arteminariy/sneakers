import type { Metadata } from 'next';
import './globals.scss';
import ThemeProvider from '@/theme/ThemeProvider';
import AppComponent from '@/components/AppComponent/AppComponent';
import { Inter } from 'next/font/google';

const inter = Inter({
	weight: '400',
	subsets: ['latin', 'cyrillic-ext'],
	display: 'swap',
  })
export const metadata: Metadata = {
	title: 'Sneaker Shop',
	description: 'A shop with sneakers',
	keywords: 'sneakers, sneaker, sneaker shop, sneaker store',
	authors: {
		url: 't.me/arteminariy',
		name: 'Arteminariy',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru" className={inter.className}>
			<body>
				<ThemeProvider>
					<AppComponent>{children}</AppComponent>
				</ThemeProvider>
			</body>
		</html>
	);
}
