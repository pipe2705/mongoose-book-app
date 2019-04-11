const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/book-app", {useNewUrlParser: true, useFindAndModify: false});
