const express = require("express");

const app = express();
const port = 8000;
const cors = require("cors");
const pool = require("./database");
const path = require("path");
const bodyParser = require('body-parser');
const ejs = require('pug');


/*
const __dirname = path.resolve(path.dirname(''))
const publicD = path.join(__dirname, './public')

app.use(express.static(publicD))*/


//middleware
app.set('views', './views')
app.set('view engine', 'pug')
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

//ROUTES

//homepage
app.get('/', (req, res) => {
    res.render('homepage')
    console.log();
})

//login
app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    let data = {
        username: req.body.username,
        password: req.body.password

    }
    let insertAccount = "INSERT INTO account(username,password) VALUES($1,$2)"
    try {
        pool.query(insertAccount, [data.username, data.password])

    } catch (error) {
        console.log("bummer")
    } finally {
        res.redirect("/home/" + data.username)
    }
})

//list all accounts
app.get("/admin/list-accounts", async (req, res) => {
    try {
        const accounts = pool.query("SELECT * FROM account");
        res.render('listAccounts', {
            accounts: (await accounts).rows
        })
    } catch (error) {
        console.error(error.message)
    }
})




//check airlines
app.get("/home/:username/airlines-list", async (req, res) => {
    try {
        const airlines = pool.query("SELECT * FROM airlines");
        res.render("listAirlines", {
            airlineList: (await airlines).rows
        })
    } catch (error) {
        console.error(error.message)
    }
})
//user home
app.get('/home/:username', async (req, res) => {
    try {
        res.render('usrHome')
    } catch (error) {

    }
})

//flights
app.get('/flights', async (req, res) => {
    try {
        const flights = pool.query("SELECT * FROM flight")
        res.render("flights", {
            flights: (await flights).rows
        })
    } catch (error) {
        console.log(error)
    }
})

//add flight 

app.get('/addFlight', async (req, res) => {
    try {
        const flights = pool.query("SELECT * FROM flight")
        res.render("addFlight", {
            flights: (await flights).rows
        })
    } catch (error) {
        console.log(error)
    }
})

app.post('/addFlight', async (req, res) => {
    let data = {
        airline_code: req.body.airline_code,
        flight_number: req.body.flight_number,
        date: req.body.date,
        origin: req.body.origin,
        destination: req.body.destination,
        price: req.body.price,
        departure_time: req.body.time,
        days: req.body.days
    }
    let insertFlight = "INSERT INTO flight (airline_code,flight_number,flight_date,origin,destination,price,departure_time,arrival_time,days,seats_left) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)"
    try {
        pool.query(insertFlight, [data.airline_code, data.flight_number, data.date, data.origin, data.destination, data.price, data.departure_time, "09:00", data.days, "180"])

    } catch (error) {
        console.log("bummer")
    } finally {
        res.redirect("/flights")
    }
})

//del Flight

app.get('/delFlight', async (req, res) => {
    try {
        res.render('delFlight')
    } catch (error) {
        console.log(error)
    }
})

app.delete('/delFlight', async (req, res) => {
    try {
        const deleteFlight = pool.query("DELETE from flight where $1=$2")
    } catch (error) {
        
    }
})

//transaction and booking
app.get("/:id/transactions", async (req, res) => {
    try {
        const transactions = pool.query("SELECT * FROM transactions");
        res.render("transactions", {
            transactions: (await transactions).rows
        })
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/bookFlight", async (req, res) => {
    try {
        res.render("book", {})
    } catch (error) {
        console.log(error)
    }
})






app.listen(port, () => {
    console.log('server has started on PORT:', port);

});