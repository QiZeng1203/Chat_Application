import Loading from './Loading';

function Messages({ username, messages, isMessagePending}) {
    function isSelf(sender) {
        if (sender === username) {
            return `self`
        }
        return "";
    }

    const SHOW = {
        PENDING: 'pending',
        MESSAGES: 'messages',
    }

    let show;
    if(isMessagePending) {
        show = SHOW.PENDING;
    } 
    else {
        show = SHOW.MESSAGES;
    }

    return (
        <div className="message-content">
            { show === SHOW.PENDING && <Loading className="messages__waiting">Loading Messages...</Loading> }
            { show === SHOW.MESSAGES && (
                <ul className="messages">
                    { Object.values(messages).map( message => (
                        <li className={`message-${isSelf(message.sender)}`} key={message.id}>
                            <p>{message.sender}: {message.text}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Messages;