const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run('CREATE TABLE professors (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)');
  db.run('CREATE TABLE reviews (id INTEGER PRIMARY KEY AUTOINCREMENT, professorID INTEGER REFERENCES professors(id), university TEXT NOT NULL, rating INTEGER CHECK ( rating >= 0 AND rating <= 10), review TEXT)');
});

//database function to return all reviews for a professor

//wrap this in a function that takes in the id of the professor and returns the reviews
db.getReviews = (id) => {
  db.all("SELECT professors.name, reviews.university, reviews.rating, reviews.review FROM reviews JOIN professors ON reviews.professorID = professors.id WHERE reviews.professorID = ?", [id], (err, rows) => {
    if (err) {
      console.error("Error getting reviews from database:", err);
      return rows;
    } else {
      return rows;
    }
  });
};

module.exports = { db, getReviews };
