const normalizedPathMongDB = require('path')
  .join(__dirname, '../protocols/mongoDB');
const Fs = require('fs');
const utils = require('../../lib/utils');
const Code = require('code');
const Lab = require('lab');
const { expect } = Code;
const lab = Lab.script();

// use some BDD verbage instead of lab default
const { describe, it, after } = lab;

exports.lab = lab;

let camiones = [
  {
    'modelo': 'Mazda 2019',
    'placa': 'C-BKR 214',
    'tipo': 'Camion de Carga'
  },
  {
    'modelo': 'Toyota 2020',
    'placa': 'C-EKR 300',
    'tipo': 'Camion pequeño'
  },
  {
    'modelo': 'Hinno 2020',
    'placa': 'C-ZZ 660',
    'tipo': 'Pickup tipo camion'
  }];

let pilotos = [
  {
    'nombre': 'Erick Cortes',
    'edad': 24,
    'dpi': '43523452345252',
  },
  {
    'nombre': 'Estuardo Arenales',
    'edad': 44,
    'dpi': '435234523452452',
  },
  {
    'nombre': 'Francisco Mendoza',
    'edad': 54,
    'dpi': '324134525354135',
  }];

let paquetes = [
  {
    "nombre": "Paquete 1 - Amazon Prime Tesis Puma",
    "descripcion": "Paquete que no se puede mojar",
  },
  {
    "nombre": "Paquete 2 - Respuesto de china",
    "descripcion": "material pesado",
  },
  {
    "nombre": "Paquete 3 - Abarrotes",
    "descripcion": "Tastos de cocina",
  },];

describe('functional tests - Install Data Mongo', () => {
  it('should get res: 200 for Update/Create any document in mongoDocument folder', async () => {
    let result;

    try {
      Fs.readdirSync(normalizedPathMongDB)
        .forEach((file) => {
          mongoDoc = require(`${normalizedPathMongDB}/${file}`);
          if (!mongoDoc) {
            return (result = 404);
          }
          utils.DBInit.addCamion(camiones[0]);
          utils.DBInit.addCamion(camiones[1]);
          utils.DBInit.addCamion(camiones[2]);

          result = 200;
        });
    } catch (error) {
      console.error('Catch levels', error);
      result = false;
    }
    expect(result)
      .to
      .equal(200);
    after(async () => {
      // placeholder to do something post tests
    });
  });
});

describe('functional tests - Install Data Mongo', () => {
  it('should get res: 200 for Update/Create any document in mongoDocument folder', async () => {
    let result;

    try {
      Fs.readdirSync(normalizedPathMongDB)
        .forEach((file) => {
          mongoDoc = require(`${normalizedPathMongDB}/${file}`);
          if (!mongoDoc) {
            return (result = 404);
          }

          utils.DBInit.addPiloto(pilotos[0]);
          utils.DBInit.addPiloto(pilotos[1]);
          utils.DBInit.addPiloto(pilotos[2]);

          result = 200;
        });
    } catch (error) {
      console.error('Catch levels', error);
      result = false;
    }
    expect(result)
      .to
      .equal(200);
    after(async () => {
      // placeholder to do something post tests
    });
  });
});

describe('functional tests - Install Data Mongo', () => {
  it('should get res: 200 for Update/Create any document in mongoDocument folder', async () => {
    let result;

    try {
      Fs.readdirSync(normalizedPathMongDB)
        .forEach((file) => {
          mongoDoc = require(`${normalizedPathMongDB}/${file}`);
          if (!mongoDoc) {
            return (result = 404);
          }
          utils.DBInit.addPaquete(paquetes[0]);
          utils.DBInit.addPaquete(paquetes[1]);
          utils.DBInit.addPaquete(paquetes[2]);

          result = 200;
        });
    } catch (error) {
      console.error('Catch levels', error);
      result = false;
    }
    expect(result)
      .to
      .equal(200);
    after(async () => {
      // placeholder to do something post tests
    });
  });
});

