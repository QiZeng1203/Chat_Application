import { MESSAGES } from './constants';

function Status({ error }) {

  const message = MESSAGES[error] || MESSAGES.default;
  return (
    <div className="status">
      <p className="err-message">Error Message: {error && message}</p>
    </div>
  );
}

export default Status;