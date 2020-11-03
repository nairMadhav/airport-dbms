"use strict";

var express = require("express");

var app = express();
var port = 8000;

var cors = require("cors");

var pool = require("./database");

var path = require("path");

var bodyParser = require('body-parser');

var ejs = require('pug');
/*
const __dirname = path.resolve(path.dirname(''))
const publicD = path.join(__dirname, './public')

app.use(express.static(publicD))*/
//middleware


app.set('views', './views');
app.set('view engine', 'pug');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
})); //ROUTES
//homepage

app.get('/', function (req, res) {
  res.render('homepage');
  console.log();
}); //login

app.get('/login', function (req, res) {
  res.render('login');
});
app.post('/login', function (req, res) {
  var data = {
    username: req.body.username,
    password: req.body.password
  };
  var insertAccount = "INSERT INTO account(username,password) VALUES($1,$2)";

  try {
    pool.query(insertAccount, [data.username, data.password]);
  } catch (error) {
    console.log("bummer");
  } finally {
    res.redirect("/home/" + data.username);
  }
}); //list all accounts

app.get("/admin/list-accounts", function _callee(req, res) {
  var accounts;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          accounts = pool.query("SELECT * FROM account");
          _context.t0 = res;
          _context.next = 5;
          return regeneratorRuntime.awrap(accounts);

        case 5:
          _context.t1 = _context.sent.rows;
          _context.t2 = {
            accounts: _context.t1
          };

          _context.t0.render.call(_context.t0, 'listAccounts', _context.t2);

          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t3 = _context["catch"](0);
          console.error(_context.t3.message);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //check airlines

app.get("/home/:username/airlines-list", function _callee2(req, res) {
  var airlines;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          airlines = pool.query("SELECT * FROM airlines");
          _context2.t0 = res;
          _context2.next = 5;
          return regeneratorRuntime.awrap(airlines);

        case 5:
          _context2.t1 = _context2.sent.rows;
          _context2.t2 = {
            airlineList: _context2.t1
          };

          _context2.t0.render.call(_context2.t0, "listAirlines", _context2.t2);

          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t3 = _context2["catch"](0);
          console.error(_context2.t3.message);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //user home

app.get('/home/:username', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            res.render('usrHome');
          } catch (error) {}

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //flights

app.get('/flights', function _callee4(req, res) {
  var flights;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          flights = pool.query("SELECT * FROM flight");
          _context4.t0 = res;
          _context4.next = 5;
          return regeneratorRuntime.awrap(flights);

        case 5:
          _context4.t1 = _context4.sent.rows;
          _context4.t2 = {
            flights: _context4.t1
          };

          _context4.t0.render.call(_context4.t0, "flights", _context4.t2);

          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t3 = _context4["catch"](0);
          console.log(_context4.t3);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); //add flight 

app.get('/addFlight', function _callee5(req, res) {
  var flights;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          flights = pool.query("SELECT * FROM flight");
          _context5.t0 = res;
          _context5.next = 5;
          return regeneratorRuntime.awrap(flights);

        case 5:
          _context5.t1 = _context5.sent.rows;
          _context5.t2 = {
            flights: _context5.t1
          };

          _context5.t0.render.call(_context5.t0, "addFlight", _context5.t2);

          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t3 = _context5["catch"](0);
          console.log(_context5.t3);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
app.post('/addFlight', function _callee6(req, res) {
  var data, insertFlight;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          data = {
            airline_code: req.body.airline_code,
            flight_number: req.body.flight_number,
            date: req.body.date,
            origin: req.body.origin,
            destination: req.body.destination,
            price: req.body.price,
            departure_time: req.body.time,
            days: req.body.days
          };
          insertFlight = "INSERT INTO flight (airline_code,flight_number,flight_date,origin,destination,price,departure_time,arrival_time,days,seats_left) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";

          try {
            pool.query(insertFlight, [data.airline_code, data.flight_number, data.date, data.origin, data.destination, data.price, data.departure_time, "09:00", data.days, "180"]);
          } catch (error) {
            console.log("bummer");
          } finally {
            res.redirect("/flights");
          }

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //del Flight

app.get('/delFlight', function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          try {
            res.render('delFlight');
          } catch (error) {
            console.log(error);
          }

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app["delete"]('/delFlight', function _callee8(req, res) {
  var deleteFlight;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          try {
            deleteFlight = pool.query("DELETE from flight where $1=$2");
          } catch (error) {}

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
}); //transaction and booking

app.get("/:id/transactions", function _callee9(req, res) {
  var transactions;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          transactions = pool.query("SELECT * FROM transactions");
          _context9.t0 = res;
          _context9.next = 5;
          return regeneratorRuntime.awrap(transactions);

        case 5:
          _context9.t1 = _context9.sent.rows;
          _context9.t2 = {
            transactions: _context9.t1
          };

          _context9.t0.render.call(_context9.t0, "transactions", _context9.t2);

          _context9.next = 13;
          break;

        case 10:
          _context9.prev = 10;
          _context9.t3 = _context9["catch"](0);
          console.error(_context9.t3.message);

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
app.get("/bookFlight", function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          try {
            res.render("book", {});
          } catch (error) {
            console.log(error);
          }

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
});
app.listen(port, function () {
  console.log('server has started on PORT:', port);
});