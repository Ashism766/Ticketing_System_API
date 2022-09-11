const express = require("express");
const bodyParser = require("body-parser");

const PORT = 8080;
const PersonList = require('./p');
const app = express();
const { v4: uuidv4 } = require('uuid');
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.listen(process.env.PORT||PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});

var i = 0;

app.route("/").get((req, res)=>{

    res.render("home");
});

app.route("/ticket").get((req, res)=>{
    res.send("<h1>TICKETING SYSTEM REST-API END_POINT</h1>");
})
.post((req, res)=>{
    
    let Uid = req.body.user_id;
    let Issue = req.body.issue;

    const uniqueId = uuidv4();
    PersonId = PersonList[i].id;

    const ticket = {
        _id: uniqueId,
        issue: Issue,
        Assigned_to: PersonId,
        Raised_by: Uid
    };

    PersonList[i].ticketList.push(ticket);
    
    const obj = {
        "message": "Ticket is successfully assgined to user",
        "success": true,
        "data": {
            "ticket_id": uniqueId,
            "assigned_to": PersonId
        }
    };

    // console.log(PersonList[i]);
    // console.log(i);
    i = (i+1)%5;
    // console.log(i);
    
    res.send(obj);

});



