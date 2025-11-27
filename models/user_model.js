const database = require("../infra/database.js");

const User = {
  async create(user) {
    const { name, email, password, address, type } = user;
    const result = await database.query({
      text: `
        INSERT INTO users (name, email, password, address, type)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `,
      values: [name, email, password, address || "", type || "user"],
    });
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await database.query({
      text: "SELECT * FROM users WHERE email = $1;",
      values: [email],
    });
    return result.rows[0];
  },

  async findById(id) {
    const result = await database.query({
      text: "SELECT * FROM users WHERE id = $1;",
      values: [id],
    });
    return result.rows[0];
  },
};

module.exports = User;
