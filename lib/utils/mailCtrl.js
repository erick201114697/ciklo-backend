const nodemailer = require('nodemailer');
const CONS = require('../constants');

module.exports.sendActivateLink = (token, email) => {
  const title = 'Confirma tu correo electrónico';
  const content = `Gracias por elegir Powereading. Para que tu cuenta quede registrada, confirma tu correo
  electrónico presionando el link celeste. Apresurate que este enlace Caducará en 48 horas.`;
  const url = `${process.env.SERVER_URL}/api/activate?token=${token}`;
  const button = 'Confirmar';
  const html = CONS.ACTIVATE_USR_HTML(title, content, url, button);
  module.exports.enviar(email, 'PWR', 'Bienvenid@ a Powereading', 'Contenido del email', html);
};

module.exports.sendRestoreLink = (token, email) => {
  const title = 'Recuperación de usuario';
  const content = `Presiona el link celeste para recuperar tu usuario. 
  Apresurate que este enlace caducará en 1 hora.`;
  const url = `${process.env.SERVER_URL}/restore?token=${token}`;
  const button = 'Confirmar';
  const html = CONS.ACTIVATE_USR_HTML(title, content, url, button);
  module.exports.enviar(
    email,
    'PWR',
    'Powereading: Recuperacion de usuario',
    'Contenido del email',
    html,
  );
};

module.exports.enviar = (to, from, subject, text, html) => {
  // const strTransporter = `smtps://${process.env.MAILER}:${encodeURIComponent('imaginacionhtml5')}@${process.env.SMTP_SERVER}`;
  const strTransporter = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER, // Your email id
      pass: process.env.KEYMAIL, // Your password
    },
  };
  const transporter = nodemailer.createTransport(strTransporter);

  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };

  // Enviamos el email
  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ', response);
    }
  });
};
