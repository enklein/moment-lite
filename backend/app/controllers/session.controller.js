const db = require("../models");
const Session = db.app_session;

exports.getAllSessions = (req, res) => {
  // Lists all session for a given user
  Session.findAll({
    where: {
      user_uuid: req.user_uuid
    }
  }).then(users => {
    if (users) {
      res.status(201).send(users);
    }
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.getSession = (req, res) => {
  // Shows specific session by ID, must be the user's own session
  Session.findOne({
    where: {
      session_uuid: req.params.session_uuid,
      user_uuid: req.user_uuid
    }
  }).then(session => {
    res.status(201).send(session)
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.newSession = (req, res) => {
  // Save session to db
  Session.create({
    session_start: req.body.session_start,
    session_note: req.body.session_note,
    user_uuid: req.user_uuid,
    task_uuid: req.body.task_uuid
  })
  .then(res.status(201).send({message: "Session was created successfully!"}))
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.updateSession = (req, res) => {
  // Save session update to db
  const old_session = Session.findOne({
    where: {
      session_uuid: req.params.session_uuid,
      user_uuid: req.user_uuid
    }
  });

  ['session_start', 'session_end', 'session_note', 'user_uuid', 'task_uuid'].forEach(key => {
    if (req.body[key]) old_session[key] = req.body[key];
  });

  Session.update(
    {
      session_start: old_session['session_start'],
      session_end: old_session['session_end'],
      session_note: old_session['session_note'],
      user_uuid: old_session['user_uuid'],
      task_uuid: old_session['task_uuid']
    },
    {
      where: {
        session_uuid: req.params.session_uuid,
        user_uuid: req.user_uuid
      }
    }
  )
  .then(res.status(200).send({message: "Session was updated successfully!"}))
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.deleteSession = (req, res) => {
  // Delete a session
  Session.destroy({
    where: {
      session_uuid: req.params.session_uuid,
      user_uuid: req.user_uuid
    }
  })
  .then(res.status(200).send({message: "Session deleted."}))
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}