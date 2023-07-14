import { FC } from 'react'
import styles from './Footer.module.scss'
 
interface IFooterProps {}
 
const Footer: FC<IFooterProps> = () => {
	return (
		<footer className={styles.footer}>
			Footer
		</footer>
	)
}
 
export default Footer