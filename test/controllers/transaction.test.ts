import TransactionCtrl from '../../src/controllers/transaction';
import TransactionDAO from '../../src/models/transaction';
import AccountCtrl from '../../src/controllers/account';
import AccountDAO from '../../src/models/account';
import PersonCtrl from '../../src/controllers/person';
import PersonDAO from '../../src/models/person';

import MongoClient from 'mongodb';

const mockBodyRequest = (data: any) => {
  return {
    body: data
  };
};

const mockParamsAndQueryRequest = (params: any, query: any) => {
  return {
    params: params,
    query: query
  };
};

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockImplementation(data => { return data });
  return res;
};

describe('Transaction Controller Tests', () => {
  let connection: any;
  let db: any;
  let account: any;
  const person: any = {
    name: "Andre de Souza Costa",
    cpf: "01260076245",
    dateOfBirth: "1993-06-20" 
  };

  const accountData: any = {
    cpf: person.cpf,
    isCurrent: true
  };

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

    const reqPerson = mockBodyRequest(person);
    const resPerson = mockResponse();

    await PersonCtrl.create(reqPerson, resPerson);

    const reqAccount = mockBodyRequest(accountData);
    const resAccount = mockResponse();

    await AccountCtrl.create(reqAccount, resAccount);
    account = resAccount.json.mock.results[0].value;
  });

  afterAll(async () => {
    await db.collection('person').deleteMany({});
    await db.collection('account').deleteMany({});
    await db.collection('transaction').deleteMany({});
    await connection.close();
  });

  it("Can get account transactions", async () => {
    const accountFilter: any = {
      account: account.account
    }
    
    const req = mockParamsAndQueryRequest(accountFilter, {});
    const res = mockResponse();

    await TransactionCtrl.getAccountTransactions(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("Can get account transactions with date period", async () => {
    const accountFilter: any = {
      account: account.account
    }
    const dateFilter: any = {
      dateIn: new Date(Date.now()).toISOString(),
      dateOut: new Date(Date.now()).toISOString()
    }
    
    const req = mockParamsAndQueryRequest(accountFilter, dateFilter);
    const res = mockResponse();

    await TransactionCtrl.getAccountTransactions(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("Cannot get account transactions with empty account param", async () => {
    const req = mockParamsAndQueryRequest({}, {});
    const res = mockResponse();

    await TransactionCtrl.getAccountTransactions(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot get account transactions with invalid account param", async () => {
    const accountFilter: any = {
      account: '0000'
    }
    const req = mockParamsAndQueryRequest(accountFilter, {});
    const res = mockResponse();

    await TransactionCtrl.getAccountTransactions(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot get account transactions with invalid date param", async () => {
    const accountFilter: any = {
        account: account.account
      }
      const dateFilter: any = {
        dateIn: 'aaaaaa',
        dateOut: 'aaaaa'
      }
      
      const req = mockParamsAndQueryRequest(accountFilter, dateFilter);
    const res = mockResponse();

    await TransactionCtrl.getAccountTransactions(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("Cannot get account transactions with unexpected error", async () => {
    const req: any = {};
    const res = mockResponse();

    await TransactionCtrl.getAccountTransactions(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
  });
});