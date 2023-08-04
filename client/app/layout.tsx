import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import type { Metadata } from 'next';
import './globals.scss';
import ThemeProvider from '@/theme/ThemeProvider';
import AppComponent from '@/components/AppComponent/AppComponent';

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
		<html lang="ru">
			<body>
				<ThemeProvider>
					<AppComponent/>
				</ThemeProvider>
			</body>
		</html>
	);
}
