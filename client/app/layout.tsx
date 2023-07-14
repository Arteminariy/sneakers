import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.scss';
import Aside from '@/components/Aside/Aside';

const inter = Roboto({
	weight: '400',
});

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
			<body className={inter.className}>
				<div className="container">
					<Header />
					<Aside />
					<main>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
