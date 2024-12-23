import { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
    const [inputName, setInputName] = useState('');
    const { setName } = useContext(UserContext);
    const reloadPage = () => {
        window.location.reload();
    };
    function handleSubmit(e) {
        e.preventDefault();
        setName(inputName);  // Set the name in context
        window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);  // Dispatch a navigation event
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" id="name" type="text" value={inputName} onChange={(e)=>setInputName(e.target.value)} />
            <button type="submit">Submit</button>
            <button onClick={reloadPage}>Reload</button>
        </form>
    );
}