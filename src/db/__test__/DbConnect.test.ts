import { describe, it } from "node:test";
import { dbConnection } from "../DbConnect";
import assert from "assert";

describe("Database Connection Test", () => {
    it("should establish a connection successfully", async () => {
        try {
            await dbConnection();
        } catch (error:any) {
            assert.fail(error);
        }
    });
});
