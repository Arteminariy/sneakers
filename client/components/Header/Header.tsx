import { FC } from 'react'
import styles from './Header.module.scss'
 
interface IHeaderProps {}
 
const Header: FC<IHeaderProps> = () => {
	return (
		<header className={styles.header}>
			<nav className={styles.nav}>

			</nav>
			<div className={styles.profileContainer}>
				
			</div>
		</header>
	)
}
 
export default Header