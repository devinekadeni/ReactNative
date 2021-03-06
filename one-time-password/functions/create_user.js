const admin = require('firebase-admin');

module.exports = function(req, res) {   //sama dengan export
  //Verify the user provided phone
  if (!req.body.phone) {
    return res.status(422).send({ error: 'Bad Input' });
  }

  //Format the phone number to remove dashes and parens
  // const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const phone = req.body.phone;

  //Create a new user account using that phone number
  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));

  //Respond to the user request, saying the account was made
}