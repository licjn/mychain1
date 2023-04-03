const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, wallet TEXT)");
});

//database function to return all reviews for a professor

//wrap this in a function that takes in the id of the professor and returns the reviews
db.getReviews = (id) => {
  db.all("SELECT * FROM users WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error("Error getting reviews from database:", err);
      return rows;
    } else {
      return rows;
    }
  });
};

module.exports = { db, getReviews };
