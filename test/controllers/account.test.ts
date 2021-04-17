import AccountCtrl from '../../src/controllers/account';
import AccountDAO from '../../src/models/account';
import PersonCtrl from '../../src/controllers/person';
import PersonDAO from '../../src/models/person';
import TransactionDAO from '../../src/models/transaction';

import MongoClient from 'mongodb';

const mockBodyRequest = (data: any) => {
  return {
    body: data
  };
};

const mocParamsRequest = (data: any) => {
  return {
    params: data
  };
};

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockImplementation(data => { return data });
  return res;
};

describe('Account Tests', () => {
  let connection: any;
  let db: any;
  let account: any;

  const person: any = {
    name: "Andre de Souza Costa",
    cpf: "01260076245",
    dateOfBirth: "1993-06-20" 
  }

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
    await AccountDAO.injectDb(db);
    await TransactionDAO.injectDb(db);
    const req = mockBodyRequest(person);
    const res = mockResponse();

    await PersonCtrl.create(req, res);
  });

  afterAll(async () => {
    await db.collection('person').deleteMany({});
    await db.collection('account').deleteMany({});
    await connection.close();
  });

  it("Can create account", async () => {
    const data: any = {
      cpf: person.cpf,
      isCurrent: true
    };
    const req = mockBodyRequest(data);
    const res = mockResponse();

    await AccountCtrl.create(req, res);
    account = res.json.mock.results[0].value;
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("Can deposit into account", async () => {
    const data: any = {
      account: account.account,
      value: 1500.0
    };
    const req = mockBodyRequest(data);
    const res = mockResponse();

    await AccountCtrl.deposit(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("Can make withdraw into account", async () => {
    const data: any = {
      account: account.account,
      value: 1000.0
    };
    const req = mockBodyRequest(data);
    const res = mockResponse();

    await AccountCtrl.withdraw(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("Can block account", async () => {
    const data: any = {
      account: account.account,
    };
    const req = mockBodyRequest(data);
    const res = mockResponse();

    await AccountCtrl.block(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("Can get account informations", async () => {
    const data: any = {
      account: account.account,
    };
    const req = mocParamsRequest(data);
    const res = mockResponse();

    await AccountCtrl.getAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("Cannot create account with invalid body", async () => {
    const req = mockBodyRequest({});
    const res = mockResponse();

    await AccountCtrl.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot create account with invalid cpf", async () => {
    const data: any = {
      cpf: '01260076249',
      isCurrent: true
    };
    const req = mockBodyRequest(data);
    const res = mockResponse();

    await AccountCtrl.create(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot create account with invalid cpf format", async () => {
    const data: any = {
      cpf: '000000',
      isCurrent: true
    };
    const req = mockBodyRequest(data);
    const res = mockResponse();

    await AccountCtrl.create(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot create account with invalid owner", async () => {
    const data: any = {
      cpf: '13584693268',
      isCurrent: true
    };
    const req = mockBodyRequest(data);
    const res = mockResponse();

    await AccountCtrl.create(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot deposit with invalid body parameters", async () => {
    const req = mockBodyRequest({});
    const res = mockResponse();

    await AccountCtrl.deposit(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot deposit with invalid account", async () => {
    const data: any = {
      account: '0000',
      value: 3000.0
    };
    const req = mockBodyRequest(data);
    const res = mockResponse();

    await AccountCtrl.deposit(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot deposit with invalid value", async () => {
    const data: any = {
      account: '0000',
      value: 'aaaa'
    };
    const req = mockBodyRequest(data);
    const res = mockResponse();

    await AccountCtrl.deposit(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot withdraw with invalid body parameters", async () => {
    const req = mockBodyRequest({});
    const res = mockResponse();

    await AccountCtrl.withdraw(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot withdraw with invalid account", async () => {
    const data: any = {
      account: '0000',
      value: 3000.0
    };
    const req = mockBodyRequest(data);
    const res = mockResponse();

    await AccountCtrl.withdraw(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot withdraw with insufficient balance", async () => {
    const data: any = {
      account: account.account,
      value: 3000.0
    };
    const req = mockBodyRequest(data);
    const res = mockResponse();

    await AccountCtrl.withdraw(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot withdraw with withdrawal limit exceeded", async () => {
    const data: any = {
      account: account.account,
      value: 3000.0
    };
    const req = mockBodyRequest(data);
    const res = mockResponse();

    await AccountCtrl.withdraw(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot block with invalid body parameters", async () => {
    const req = mockBodyRequest({});
    const res = mockResponse();

    await AccountCtrl.block(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot block with invalid account", async () => {
    const data: any = {
      account: '0000'
    };
    const req = mockBodyRequest(data);
    const res = mockResponse();

    await AccountCtrl.block(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot get account informations with invalid body parameters", async () => {
    const req = mocParamsRequest({});
    const res = mockResponse();

    await AccountCtrl.getAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot get account informations with invalid account", async () => {
    const data: any = {
      account: '0000'
    };
    const req = mocParamsRequest(data);
    const res = mockResponse();

    await AccountCtrl.getAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot create account with unexpected error", async () => {
    const req: any = {};
    const res = mockResponse();

    await AccountCtrl.getAccount(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("Cannot deposit into account with unexpected error", async () => {
    const req: any = {};
    const res = mockResponse();

    await AccountCtrl.deposit(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("Cannot withdraw into account with unexpected error", async () => {
    const req: any = {};
    const res = mockResponse();

    await AccountCtrl.withdraw(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("Cannot block account with unexpected error", async () => {
    const req: any = {};
    const res = mockResponse();

    await AccountCtrl.block(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
  });
});