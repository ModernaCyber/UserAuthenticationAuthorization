import { describe } from "node:test";

describe("Main server test",()=>{
    it ("should test server.js",async()=>{

        const response = await fetch("http://localhost:3000/");

        expect(response.status).toBe(200)


    }); //npm i --save-dev @types/jest
})