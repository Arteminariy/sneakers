import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import styles from './ProductsLayout.module.scss';
import Aside from '@components/Aside/Aside';

const inter = Inter({
	weight: '400',
	subsets: ['latin', 'cyrillic-ext'],
	display: 'swap',
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

export default function ProductsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={styles.container}>
			<Aside />
			<main>{children}</main>
		</div>
	);
}
