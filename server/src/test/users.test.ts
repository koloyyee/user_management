import { Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { app } from '../main';

let mongoServer: MongoMemoryServer;
let client: MongoClient;
let db: Db;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  client = new MongoClient(uri);
  await client.connect();
  db = client.db('test');
});

afterAll(async () => {
  await client.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await db.collection('users').deleteMany({});
});

describe('User CRUD operations', () => {
  test('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe('test@example.com');
  });

  test('should get all users', async () => {
    await db.collection('users').insertOne({
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123',
    });

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].email).toBe('test@example.com');
  });

  test('should update a user', async () => {
    const user = await db.collection('users').insertOne({
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123',
    });

    const res = await request(app)
      .put(`/api/users/${user.insertedId}`)
      .send({
        firstName: 'Jane',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.firstName).toBe('Jane');
  });

  test('should delete a user', async () => {
    const user = await db.collection('users').insertOne({
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123',
    });

    const res = await request(app).delete(`/api/users/${user.insertedId}`);

    expect(res.statusCode).toEqual(200);
    const deletedUser = await db.collection('users').findOne({ _id: user.insertedId });
    expect(deletedUser).toBeNull();
  });
});