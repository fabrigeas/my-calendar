"use strict";

const {
  post,
} = require("./helper");

var auth;

const data = {
  name: "hello world",
  date: "today",
};

beforeAll( async () => {
  
});

afterAll( async () => {
});

describe("Auth >", () => {
  
  let password;
  let hashedPassword;

  it("Should [generateToken]", async () => {

    auth = await post(null, "auth.generateToken", {data});

    expect( auth.accessToken ).toBeDefined();
    expect( auth.expirationDate ).toBeDefined();

  });
  
  it("Should [encodePassword]", async () => {

    password = "98919032Fab!";
    hashedPassword = await post(null, "auth.encodePassword", {password});

    expect( hashedPassword ).toBeDefined();

  });
  
  it("Should [veriyfyPasswords]", async () => {

    const result = await post(null, "auth.veriyfyPasswords", {password, hashedPassword});

    expect( result ).not.toBe( false );

  });
  
  it("Should [verifyToken]", async () => {

    const result = await post(null, "auth.verifyToken", {token: auth.accessToken});
    expect( result.name ).toBe( data.name );

  });
  
  it("Should [verifyAndRenewToken]", async () => {

    const result = await post(null, "auth.verifyAndRenewToken", {token: auth.accessToken});

    expect( result.accessToken ).toBeDefined();
    expect( result.expirationDate ).toBeDefined();

    // expect( result.accessToken ).toBe( auth.accessToken );

  });

});
