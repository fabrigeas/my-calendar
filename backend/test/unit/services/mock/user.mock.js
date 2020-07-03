module.exports  = (identifier) => ({
  firstName: `Firstname - ${identifier}`,
  lastName: `Lastname - ${identifier}`,
  username: `Username - ${identifier}`,
  email: `${identifier}@mail.con`,
  birthDate: "23.09.1989",
  password: "aaaa",
  phone: `${identifier}`,
  address: {
    street: `Street - ${identifier}`,
    number: "22A",
    city: "Frankfurt",
    zip: "60389",
    country: "DE"
  }
})