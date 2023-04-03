const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run('CREATE TABLE professors (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)');
  db.run('CREATE TABLE reviews (id INTEGER PRIMARY KEY AUTOINCREMENT, professorID INTEGER REFERENCES professors(id), university TEXT NOT NULL, rating INTEGER, review TEXT)');
  // Trigger that checks rating is between 0 and 10 before inserting new row
  db.run('CREATE TRIGGER check_rating BEFORE INSERT ON reviews WHEN NEW.rating < 0 OR NEW.rating > 10 BEGIN SELECT RAISE(ABORT, "Rating must be between 0 and 10"); END;');
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
