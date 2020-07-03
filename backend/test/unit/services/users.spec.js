"use strict";

const {
  post,
  put,
  fetch,
} = require("./helper");

const password = "1827361Blasou!!";

let user = {
  firstname: "Test user",
  lastname: "Test user",
  username: "tester",
  email: "tester@email.com",
  password,
};

beforeAll( async () => {
  
});

afterAll( async () => {
  await post(null, `users.remove?id=${user.id}`);
});

describe("Users > create", () => {
  
  it("Should create a new user", async () => {

    const result = await post(null, "users.create", user);

    user = result;

    expect( result.id ).toBeDefined();
    expect( result.password ).not.toBeDefined();

  });

});

describe("Users > checkAvailability", () => {
  
  it("Should return false because username is already taken by test user", async () => {

    let checkAvailability = await post(null, `users.checkAvailability?username=${user.username}`);
    expect( checkAvailability ).toBe( false );

  });
  
  it("Should return false because 'email' is already taken", async () => {

    let checkAvailability = await post(null, `users.checkAvailability?email=${user.email}`);
    expect( checkAvailability ).toBe( false );

  });
  
  it("Should return true", async () => {

    let checkAvailability = await post(null, `users.checkAvailability?username=${user.email}`);
    expect( checkAvailability ).toBe( true );

  });

});

describe("Users > signIn", () => {
  
  it("Should return a user with a valid accessToken", async () => {

    const result = await post(null, "users.signIn", {
      pseudo: user.email || user.username,
      password,
    });

    user = result.user;
    
    expect( result.accessToken ).toBeDefined();
    expect( user.id ).toBeDefined();
    expect( user.username).toBeDefined();
    expect( user.password).not.toBeDefined();

  });

});

describe("Users > update", () => {
  
  it("Should update firstname and lastname", async () => {

    const firstname = "new First name";
    const lastname = "new last name";

    const payload = {
      firstname,
      lastname
    };

    const result = await fetch(null, `users/${user.id}`, {method:"PUT", body: payload});

    expect( result.id ).toBe( user.id )
    expect( result.firstname ).toBe( firstname )
    expect( result.lastname ).toBe( lastname )

    expect( result.firstname ).not.toBe( user.firstname)
    expect( result.lastname ).not.toBe( user.lastname )

    expect( result.password ).not.toBeDefined();


    user = result; // dont't forget to update user for the next tests

  });
  
  it("Should not update password", async () => {

    const id = user.id;
    const password = "changed";

    const payload = {
      password
    };

    const result = await put(null, `users/${id}`, payload);

    expect( result.id ).toBe( user.id )
    expect( result.password ).not.toBeDefined();

    user = result; // dont't forget to update user for the next tests

  });

});

describe("Users > findOne", () => {
  
  it("Should return a user with a valid id", async () => {

    const result = await fetch(null, `users.findOne?username=${user.username}`);

    expect( result.id ).toBeDefined();
    expect( result.password ).not.toBeDefined();

  });

});

