import { mongoConnector, mongoDisconnector } from '../config/MongoConfig';
import Example, { IExample } from '../models/ExampleModel';

describe('User model', () => {
  beforeAll(async () => {
    jest.setTimeout(30000);
    await mongoConnector();
  });

  afterAll(async () => {
    await mongoDisconnector();
  });

  it('Should save a user', async () => {
    expect.assertions(3);

    const newExample: IExample = new Example({
      firstName: "Adrisson",
      lastName: "Samersla",
      email: "test@example.com",
      company: "FULL COFFE OVERFLOW",
      phone: 85996830178,
      created_date: new Date()
    })

    const spy = jest.spyOn(newExample, 'save');
    const savedExample = await newExample.save();

    expect(spy).toHaveBeenCalled();

    expect(savedExample).toMatchObject({
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      company: expect.any(String),
      phone: expect.any(Number),
      created_date: expect.any(Date)
    });

    expect(savedExample.email).toBe('test@example.com');
  });
});