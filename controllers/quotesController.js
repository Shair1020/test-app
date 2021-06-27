const { v4: uuidv4 } = require("uuid");
const { readFile, writeFile } = require("../utility/common");

exports.fetchQuotes = async (req, res) => {
  try {
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");
    // console.log(quotes);
    res.status(200).json({
      status: "success",
      data: { quotes },
    });
  } catch (error) {
    console.log(error);
  }
};
exports.addQuote = async (req, res) => {
  try {
    ///take out data from body of request
    var { title, quote, author } = req.body;
    ///fetch file
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");
    ///push file
    var newQuotes = {
      id: uuidv4(),
      title,
      quote,
      author,
    };
    quotes.push(newQuotes);
    ////witefile updateds
    await writeFile(`${__dirname}/../data/quotes.json`, JSON.stringify(quotes));
    res.status(200).json({
      msg: "add quote",
    });
  } catch (error) {
    console.log(error);
  }
};
exports.fetchQuote = async (req, res) => {
  try {
    //fetch id from params
    var { quoteId } = req.params;
    // read quotes from file
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");
    ////find quote with given id
    var quote = quotes.find(({ id }) => id === quoteId);
    //return  that  specific quote
    res.status(200).json({
      data: {
        quote,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
exports.updateQuotes = async (req, res) => {
  try {
    ///fetch quote id
    var { quoteId } = req.params;
    ///read file
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");
    /// updated quotes
    var updatedQuote = quotes.map((quote) => {
      if (quote.id === quoteId) {
        return {
          ...quote,
          ...req.body,
        };
      }
      return quote;
    });
    ///write update file
    await writeFile(
      `${__dirname}/../data/quotes.json`,
      JSON.stringify(updatedQuote)
    );
    res.status(200).json({
      status: "success",
      data: {
        quotes: updatedQuote,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
exports.deleteQuotes = async (req, res) => {
  try {
    ////fetch id
    var { quoteId } = req.params;
    ////read quotes
    var quotes = await readFile(`${__dirname}/../data/quotes.json`, "utf-8");
    //// delete the specific quote
    var deletedQuote = quotes.filter((quote) => quote.id !== quoteId);
    ///write update file
    await writeFile(
      `${__dirname}/../data/quotes.json`,
      JSON.stringify(deletedQuote)
    );
    ///return quote
    res.status(200).json({
      status: "success",
      data: {
        quotes: quotes.find(({ id }) => id === quoteId),
      },
    });
  } catch (error) {
    console.log(error);
  }
};
