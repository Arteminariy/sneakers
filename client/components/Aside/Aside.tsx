import { FC } from 'react'
import styles from './Aside.module.scss'
import { Button } from '@/shared/ui/Button'
 
interface IAsideProps {}
 
const Aside: FC<IAsideProps> = () => {
	return (
		<aside className={styles.aside}>
			aside
			<Button>Text</Button>
		</aside>
	)
}
 
export default Aside