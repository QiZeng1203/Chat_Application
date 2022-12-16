import { useState } from 'react';

function AddMessageForm({ onAddMessage }) {
    const[ message, setMessage ] = useState('');

    function onSubmit(e) {
        e.preventDefault(); 
        setMessage('');
        onAddMessage(message);
    }

    function onTyping(e) {
        setMessage(e.target.value);
    }

    return (
        <form className="add__form" action="#/add" onSubmit={onSubmit}>
            <input className="add__message" value={message} onChange={onTyping}/>
            <button type="submit" className="send__button">Send</button>
        </form>
    )
}

export default AddMessageForm;