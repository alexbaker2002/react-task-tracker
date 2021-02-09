import Button from './Button'
import { useLocation } from 'react-router-dom'


const Header = ({title, onAdd, showAdd}) => {
    const location = useLocation()

    return (


        <header className='header'>

        <h1 
        //style={headingStyle}
        >{title}</h1>
       {location.pathname === '/' && <Button 
       color={showAdd ? 'red' : 'green'} 
       text={showAdd ? 'Hide': 'Add'}
       onClick={onAdd}
       />}

        </header>
    )
}
Header.defaultProps = {
    title: 'Task Tracker',
}
//css in JS
// const headingStyle = {
// color: 'red',
// backgroundColor: 'black'
// }
export default Header
