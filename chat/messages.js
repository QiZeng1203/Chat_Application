const uuid = require('uuid').v4;

const id1 = uuid();

const messages = {
    [id1]: {
        id: id1,
        sender: "Qi",
        text: "Welcome everyone, let's chat!",
    },
    
};

function addMessage(sender, text) {
    const id = uuid();
    messages[id] = {
      id,
      sender,
      text,
    };
}

function getMessages() {
    return messages;
}

module.exports = {
    addMessage,
    getMessages,
};