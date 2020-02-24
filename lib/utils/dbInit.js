const Model = require('../models/models-mongo');

const AdminInit = {
  scope: ['admin'],
  enrollment: 'admin',
  names: 'admin',
  surnames: 'admin',
  country: 'GT',
  mail: 'erick@gmail.com ',
  avatar: '/public/avatar.png',
  status: 'ACTIVATED',
  birthdate: Date.now(),
  phone: '502 56354080',
  sex: 'M',
  password: 'test',
  created_date: Date.now(),
};
const AdminInit2 = {
  scope: ['admin'],
  enrollment: 'admin',
  names: 'admin',
  surnames: 'admin',
  country: 'GT',
  mail: 'ciklo@gmail.com',
  avatar: '/public/avatar.png',
  status: 'ACTIVATED',
  birthdate: Date.now(),
  phone: '502 56354080',
  sex: 'M',
  password: 'test',
  created_date: Date.now(),
};

module.exports.createAdmin = () => {
  const condition = {
    'mail': 'erick@gmail.com'
  };

  Model.User.findOne(condition, (err, user) => {
    if (err) {
      console.error('The administrator could not be found ', err.message);
    }

    if (!user) {
      const newAdmin = new Model.User(AdminInit);

      newAdmin.save((saveErr) => {
        if (saveErr) {
          console.error('The administrator could not be created ', saveErr.message);
        }
        console.log('The administrator created ');
      });
    } else {
      console.log('The administrator already exists!! ');
    }
  });
};

module.exports.createAdmin2 = () => {
  const condition = {
    'mail': 'ciklo@gmail.com'
  };

  Model.User.findOne(condition, (err, user) => {
    if (err) {
      console.error('The administrator could not be found ', err.message);
    }

    if (!user) {
      const newAdmin = new Model.User(AdminInit2);

      newAdmin.save((saveErr) => {
        if (saveErr) {
          console.error('The administrator could not be created ', saveErr.message);
        }
        console.log('The administrator created ');
      });
    } else {
      console.log('The administrator already exists!! ');
    }
  });
};

module.exports.addCamion = async (jsonDoc) => {
  try {

    const newAdmin = new Model.Camion(jsonDoc);
    let restult = newAdmin.save((saveErr) => {
      if (saveErr) {
        console.error('The administrator could not be created ', saveErr.message);
      }
      console.log('The administrator created ');
    });
    return restult;
  } catch (error) {
    console.error('addLevels', error);
    return null;
  }
};

module.exports.addPiloto = async (jsonDoc) => {
  try {

    const newAdmin = new Model.Piloto(jsonDoc);
    let restult = newAdmin.save((saveErr) => {
      if (saveErr) {
        console.error('The administrator could not be created ', saveErr.message);
      }
      console.log('The administrator created ');
    });
    return restult;
  } catch (error) {
    console.error('addLevels', error);
    return null;
  }
};

module.exports.addPaquete = async (jsonDoc) => {
  try {

    const newAdmin = new Model.Paquete(jsonDoc);
    let restult = newAdmin.save((saveErr) => {
      if (saveErr) {
        console.error('The administrator could not be created ', saveErr.message);
      }
      console.log('The administrator created ');
    });
    return restult;
  } catch (error) {
    console.error('addLevels', error);
    return null;
  }
};
