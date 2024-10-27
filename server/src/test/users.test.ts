import { Server } from 'http';
import { Collection, Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from "supertest";
import { app } from "../main";


let mongoServer: MongoMemoryServer;
let client: MongoClient;
let db: Db;
let collection: Collection
let server: Server;
let sessionID: string
const mock = {
  email: "test@email.com",
  firstName: "test",
  lastName: "last",
  password: "passwordpassword"
}
let oid: string | null;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  client = new MongoClient(uri);
  await client.connect();
  db = client.db('test');
  collection = db.collection("testing");
  server = app.listen(process.env.TEST_PORT, () => {
    console.log("connection testing on port: " +  process.env.TEST_PORT)
  })
});
beforeAll(async () => {
  const res = await request(app)
    .post("/api/users/login")
    .send({
      email: "another@email.com",
      password: "passwordpassword",
    })
  sessionID = res.body['sessionID'];
})

beforeEach(async () => {
  await collection.deleteMany({})

  // expect(res.body).toHaveProperty("sessionID");
})

afterAll(async () => {
  if (oid) {
    const res = await request(app)
      .delete("/api/users/" + oid)
      .set("Authorization", `Bearer ${sessionID}`);

    expect(res.body.result.acknowledged).toBe(true);
  }

  await server.close((err) => {
    console.log("tearing down.")
    console.log(err)
  })
  await client.close();
  await mongoServer.stop();
});


describe("Test user CRUD operation", () => {
  it("should login and return sessionID", async () => {

    const res = await request(app)
      .post("/api/users/login")
      .send({
        email: "another@email.com",
        password: "passwordpassword",
      })
    sessionID = res.body['sessionID'];

    expect(res.body).toHaveProperty("sessionID");
  }),
    it("should not login with wrong credential", async () => {

      const res = await request(app)
        .post("/api/users/login")
        .send({
          email: "another@email.com",
          password: "wrongpassword",
        })
      expect(res.status).toBe(401);
    })
  it("should return list of users", async () => {
    console.log("stored?? " + sessionID)
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${sessionID}`);


    expect(res.status).toBe(200);
    expect(res.body.users).toBeInstanceOf(Array);
    expect(res.body.users.length).toBeGreaterThanOrEqual(1);
  })
  it("should return 401 if no sessionID", async () => {
    const res = await request(app)
      .get("/api/users")
    expect(res.status).toBe(401);
  })
 
  it("should create user", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${sessionID}`)
      .send(mock);

    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.result.insertedId).toBeTruthy();

    oid = res.body.result.insertedId;

  })
  it("should found new user", async () => {
    const newUser = await request(app)
      .get("/api/users/" + oid)
      .set("Authorization", `Bearer ${sessionID}`)

    expect(newUser.status).toBe(200)
  })

  it("should delete new user", async () => {
    const res = await request(app)
      .delete("/api/users/" + oid)
      .set("Authorization", `Bearer ${sessionID}`)

    expect(res.status).toBe(200);
    expect(res.body.result.acknowledged).toBe(true);
    oid = null;
  })
  it("should update new user", async () => {
    const res = await request(app)
      .post("/api/users/" + oid)
      .set("Authorization", `Bearer ${sessionID}`)
      .send({
        email: "update@email.com",
        firstName: "updated",
        lastName: "upgraded"
      })

    expect(res.status).toBe(200);
    expect(res.body.result.acknowledged).toBe(true);
    oid = null;
  })
})
