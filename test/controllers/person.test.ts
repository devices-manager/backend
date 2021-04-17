import PersonCtrl from '../../src/controllers/person';
import PersonDAO from '../../src/models/person';

import MongoClient from 'mongodb';

const mockBodyRequest = (data: any) => {
  return {
    body: data
  };
};

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockImplementation(data => { return data });
  return res;
};

describe('Person Controller Tests', () => {
  let connection: any;
  let db: any;

  beforeAll(async () => {
    connection = await MongoClient.connect(
      'mongodb+srv://dock-user:123Pipoca@cluster0.qttvy.mongodb.net/bank?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    db = await connection.db('bank-test');
    await PersonDAO.injectDb(db);
  });

  afterAll(async () => {
    await db.collection('person').deleteMany({});
    await connection.close();
  });

  it("Can create person", async () => {
    const person: any = {
      name: "Andre de Souza Costa",
      cpf: "01260076245",
      dateOfBirth: "1993-06-20" 
    }
    
    const req = mockBodyRequest(person);
    const res = mockResponse();

    await PersonCtrl.create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("Cannot create person with invalid body", async () => {
    const req = mockBodyRequest({});
    const res = mockResponse();

    await PersonCtrl.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot create person with invalid cpf", async () => {
    const person: any = {
      name: "Andre de Souza Costa",
      cpf: "01260076249",
      dateOfBirth: "1993-06-20" 
    }
    const req = mockBodyRequest(person);
    const res = mockResponse();

    await PersonCtrl.create(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot create person with invalid cpf format", async () => {
    const person: any = {
      name: "Andre de Souza Costa",
      cpf: "01260076249123",
      dateOfBirth: "1993-06-20" 
    }
    const req = mockBodyRequest(person);
    const res = mockResponse();

    await PersonCtrl.create(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot create person with invalid data of bithday", async () => {
    const person: any = {
      name: "Andre de Souza Costa",
      cpf: "01260076245",
      dateOfBirth: "aa-aa-aa" 
    }
    const req = mockBodyRequest(person);
    const res = mockResponse();

    await PersonCtrl.create(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot create person with existing person", async () => {
    const person: any = {
      name: "Andre de Souza Costa",
      cpf: "01260076245",
      dateOfBirth: "1993-06-20" 
    }
    const req = mockBodyRequest(person);
    const res = mockResponse();

    await PersonCtrl.create(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot create person with unexpected error", async () => {
    const req: any = {};
    const res = mockResponse();

    await PersonCtrl.create(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
  });
});