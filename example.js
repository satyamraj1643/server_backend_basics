const users = require("./MOCK_DATA.json");
const user = users.find((user) => user.id === 46);
console.log(user);