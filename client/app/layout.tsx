import type { Metadata } from 'next';
import './globals.scss';
import ThemeProvider from '@/theme/ThemeProvider';
import AppLayout from '@/components/AppLayout/AppLayout';
import { Inter } from 'next/font/google';

const inter = Inter({
	weight: '400',
	subsets: ['latin', 'cyrillic-ext'],
	display: 'swap',
  })
const inter = Inter({
	weight: '400',
	subsets: ['latin', 'cyrillic-ext'],
	display: 'swap',
  })
export const metadata: Metadata = {
	title: 'Sneaker Shop',
	description: 'A shop with sneakers',
	keywords: 'sneakers, sneaker, sneaker shop, sneaker store',
	authors: [
		{
			url: 't.me/arteminariy',
			name: 'Arteminariy',
		},
		{
			url: 't.me/BabylonVampire',
			name: 'BabylonVampire',
		},
	]
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru" className={inter.className}>
		<html lang="ru" className={inter.className}>
			<body>
				<ThemeProvider>
					<AppLayout>{children}</AppLayout>
				</ThemeProvider>
			</body>
		</html>
	);
}
