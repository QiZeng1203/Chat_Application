const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
};

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

function getAllsessions() {
  return sessions;
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  getAllsessions,
};