const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const Questions = require("./models/Questions");
require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
let savedArray = [];

const mongodb = `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.skspfi8.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongodb).then((result) => app.listen(80)).catch((err) => console.log(err))


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/test", async (req, res) => {
  // getQuestions();
  let questions = await getQuestions();
  res.render("test", {questions: questions});
});
app.get("/admin", (req, res) => {
  res.render("admin");

});

app.post("/api/post/admin", async (req, res) => {
  let {question, answer} = req.body;
  console.log(req.body)

  let info = await Questions.create({question, answer}).then((result) =>  {
    if (result.__v === 0) {
      res.render("admin");
      // res.get("/admin");
    }
  });


})
app.post("/api/post/netplan", (req, res) => {
  let { elevpool, subnet, address, gateway, nameserver, searchdomain } =
    req.body;

  searchdomain = searchdomain.toLowerCase();
  console.log(req.body);

  checkForm(elevpool, address, gateway, nameserver, searchdomain, subnet, res);
});

app.post("/api/post/send-answer", (req, res) => {
  let { answer, id } = req.body;
  console.log(answer, id);
  checkAnswer(answer);
  res.render("test")
});
// app.listen(80);

function checkForm(
  elevpool,
  address,
  gateway,
  nameserver,
  searchdomain,
  subnet,
  res
) {
  let message = "";
  let successMessage = "";
  if (!address.includes(`10.12.${elevpool}`)) {
    message += "this didnt work, address <br>";
  }

  if (gateway !== `10.12.${elevpool}.1`) {
    message += "this didnt work, gateway <br>";
  }

  if (
    !nameserver.includes(`1.1.1.1`) ||
    !nameserver.includes(`8.8.8.8`) ||
    !nameserver.includes(`10.10.1.30`)
  ) {
    message += "this didnt work, nameserver <br>";
  }

  console.log(searchdomain === "");
  if (!searchdomain.includes(`ikt-fag.no`) && searchdomain !== "") {
    message += "this didnt work, searchdomain <br>";
  }

  if (
    subnet === `10.12.${elevpool}.0/24` &&
    address.includes(`10.12.${elevpool}`) &&
    gateway === `10.12.${elevpool}.1` &&
    (nameserver.includes(`1.1.1.1`) ||
      nameserver.includes(`8.8.8.8`) ||
      nameserver.includes(`10.10.1.30`)) &&
    (searchdomain.includes(`ikt-fag.no`) || searchdomain === "")
  ) {
    successMessage += `Woho, this works <br> 
    Subnet: ${subnet} <br> 
    Address: ${address} <br> 
    Gateway: ${gateway} <br> 
    Name server: ${nameserver} <br> 
    Search domain: ${searchdomain.toLowerCase()} <br> 
    `;
    res.send(successMessage);
  } else {
    console.log("this didnt work, redo");
    res.send(message);
  }
}

async function getQuestions() {
  questions = await Questions.find({});
  console.log(questions)

  let arrayLength = questions.length;
  console.log(arrayLength)

  let random = Math.floor(Math.random() * arrayLength);
  console.log(random)
  let QA;

  if(!savedArray.includes(questions[random]._id)) {
    QA = {
      question: questions[random].question,
      id: questions[random]._id,
      answer: questions[random].answer
    };
    savedArray.push(QA.id);
  } else {
    random = Math.floor(Math.random() * arrayLength);
  }

  console.log(QA)

  return QA;

}

async function checkAnswer(answer) {
  
}