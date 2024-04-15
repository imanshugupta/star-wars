import './index.scss'
import { Spinner } from 'reactstrap'

export const Loader = () => {
    return (
        <div className="loader">
            <Spinner size={'lg'} />
        </div>
    )
}