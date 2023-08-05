import { FC, PropsWithChildren, useContext } from 'react';
import '../../app/globals.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
	
	return (
		<div className="app light">
			<Header />
			<div className="container">
				<main>{children}</main>
			</div>
			<Footer />
		</div>
	);
};

export default AppLayout;
