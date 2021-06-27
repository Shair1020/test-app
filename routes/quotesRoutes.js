const express = require("express");
const {
  fetchQuotes,
  addQuote,
  fetchQuote,
  updateQuotes,
  deleteQuotes,
} = require("../controllers/quotesController");

const router = express.Router();

router.route("/").get(fetchQuotes).post(addQuote);

router
  .route("/quote/:quoteId")
  .get(fetchQuote)
  .patch(updateQuotes)
  .delete(deleteQuotes);

module.exports = router;
