"use strict";

const {
  post,
  put,
  fetch,
} = require("./helper");


let project = {
  owner: "5e8dfc70bf3aff05cc1894b2",
  name: "Test project",
  describe: "Testing the bla",
  taskPriorities: {
    low: { color: "green", index: 0},
    normal: { color: "blue", index: 1},
  }

};

beforeAll( async () => {
  
});

afterAll( async () => {
  await post(null, `projects.remove?id=${project.id}`);
});

describe("Project > create", () => {
  
  it("Should return a valid id", async () => {

    const result = await post(null, "projects.create", project);

    project = result;

    expect( result.id ).toBeDefined();
    expect( result.tasks ).toBeDefined();
    expect( result.rows ).toBeDefined();
    expect( result.people ).toBeDefined();

  });

});


describe("Project > update", () => {
  
  it("Should update project", async () => {

    const id = project.id;
    const taskPriorities = {
      ...project.taskPriorities,
      hight: { color: "red", index: 2},
    };
    const people = [
      {id: "ObjectId"}
    ];
    const body = {
      taskPriorities,
      people
    };

    const result = await fetch(null, `projects/${id}`, {
      method: "PUT",
      body
    });

    expect( result.id ).toBe( project.id )
    expect( result.taskPriorities ).toStrictEqual( taskPriorities )
    expect( result.people ).toStrictEqual( people )

    project = result; // dont't forget to update project for the next tests

  });

});

