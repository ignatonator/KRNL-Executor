import {Link} from 'react-router-dom'
const Header = ()=>{
    return (
        <header className="App-header">
            <div className="App-header"><h1>Which element are you?</h1></div>
            <nav className="App-nav">
                <Link className="nav-link" to="/">Home</Link>

                <Link className="nav-link" to="/quiz">Quiz</Link>
            </nav>
        </header>
    )
}
export default Header;