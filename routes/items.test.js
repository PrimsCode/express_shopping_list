process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const items = require("../fakeDb");

let sample1 = {name: "table", price: 25.50};

//add sample to database before test
beforeEach(() => {
    items.push(sample1);
});

//reset database
afterEach(() => {
    items.length = 0;
});

//tests

describe("Get /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({items: [sample1]});
    })
})

describe("POST /items", () => {
    test("Create an item", async () => {
        const res = await request(app)
        .post("/items")
        .send({name: "clock", price: 15});
    
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({added: {name: "clock", price: 15}});
    })
})

describe("GET /items/:name", () => {
    test("Get specific item by name", async () => {
        const res = await request(app).get("/items/table");

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(sample1);
    })
})

describe("PATCH /items/:name", () => {
    test("Update an item name", async () => {
        const res = await request(app)
        .patch("/items/table")
        .send({name: "chair"});

        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({updated: {name: "chair", price: 25.50}});
    })
})

describe("DELETE /items/:name", () => {
    test("Delete an item name", async () => {
        const res = await request(app)
        .delete("/items/chair");
        
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({deleted: {name: "chair", price: 25.50}});
    })
})


