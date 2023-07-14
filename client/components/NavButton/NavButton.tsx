import { FC } from 'react'
import styles from './NavButton.module.scss'
import Link from 'next/link';
 
interface INavButtonProps {
	children: React.ReactNode;
	link: string;
}
 
const NavButton: FC<INavButtonProps> = ({children, link}) => {
	return (
		<Link href={link} className={styles.navButton}>
			{children}
		</Link>
	)
}
 
export default NavButton