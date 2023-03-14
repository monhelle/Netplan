const { urlencoded } = require("express");
const express = require("express");


const app = express();
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/api/post/netplan", (req, res) => {
  console.log('req body')
  let {elevpool, subnet, address, gateway, nameserver, searchdomain} = req.body;
  console.log(subnet, address, gateway, nameserver, searchdomain)

  if (subnet === `10.12.${elevpool}.0/24`) {
    console.log("wohooo subnet")
  }

  if (address.includes(`10.12.${elevpool}`)) {
    console.log("wohooo address")
  }

  if (gateway === `10.12.${elevpool}.1`) {
    console.log("wohooo gateway")
  }

  if (nameserver === `1.1.1.1` || nameserver === `8.8.8.8`) {
    console.log("wohooo nameserver")
  }

  if (searchdomain.includes(`ikt-fag.no`)) {
    console.log("wohooo searchdomain")
  }

  // if (subnet === `10.12.${32}.0/24`) {
  //   console.log("wohooo")
  // }
})
app.listen(80) 