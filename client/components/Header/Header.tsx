import { FC } from 'react'
import styles from './Header.module.scss'
import NavButton from '../NavButton/NavButton'
 
interface IHeaderProps {}
 
const Header: FC<IHeaderProps> = () => {
	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<NavButton link='/'>Главная</NavButton>
				<NavButton link='/products'>Товары</NavButton>
			</nav>
			<div className={styles.profileContainer}>
				
			</div>
		</header>
	)
}
 
export default Header