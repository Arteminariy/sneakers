import { FC, PropsWithChildren } from 'react'
import styles from './Button.module.scss'
 
interface IButtonProps {}
 
const Button: FC<PropsWithChildren<IButtonProps>> = ({children}) => {
	return (
		<button className={styles.Button}>
			{children}
		</button>
	)
}
 
export default Button