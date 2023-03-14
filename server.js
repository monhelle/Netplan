const { urlencoded } = require("express");
const express = require("express");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/api/post/netplan", (req, res) => {
  let { elevpool, subnet, address, gateway, nameserver, searchdomain } =
    req.body;
  let message = "";

  if (!address.includes(`10.12.${elevpool}`)) {
    message += "this didnt work, address <br>";
  }

  if (gateway !== `10.12.${elevpool}.1`) {
    message += "this didnt work, gateway <br>";
  }

  if (
    nameserver !== `1.1.1.1` &&
    nameserver !== `8.8.8.8` &&
    nameserver !== `1.1.1.1,8.8.8.8` &&
    nameserver !== `1.1.1.1, 8.8.8.8`
  ) {
    message += "this didnt work, nameserver <br>";
  }

  if (!searchdomain.includes(`ikt-fag.no`)) {
    message += "this didnt work, searchdomain <br>";
  }

  if (
    subnet === `10.12.${elevpool}.0/24` &&
    address.includes(`10.12.${elevpool}`) &&
    gateway === `10.12.${elevpool}.1` &&
    (nameserver === `1.1.1.1` ||
      nameserver === `8.8.8.8` ||
      nameserver === `1.1.1.1,8.8.8.8` ||
      nameserver === `1.1.1.1, 8.8.8.8`) &&
    searchdomain.includes(`ikt-fag.no`)
  ) {
    console.log("wohooo all works");
  } else {
    console.log("this didnt work, redo");
    res.send(message);
  }
});
app.listen(80);
