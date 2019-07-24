var express = require('express'),
    path = require('path'),
    http = require('http');
var mysql = require("mysql");
var url = require('url');


var app = express();
var bodyParser = require('body-parser');
// var multer = require('multer'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, './dist/first')));

function supportCrossOriginScript(req, res, next) {
    res.status(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
}
app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    //    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
var config = {};
config.db = {};

config.db.host = "localhost";
config.db.user = "root";
config.db.password = "root";
config.db.database = "clinic";


var connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    multipleStatements: true
});



app.get('/search', function (req, res) {
    //    res.header("Access-Control-Allow-Origin", "*");
    var newval = url.parse(req.url, true).query['newval'];
    console.log(newval);
    connection.query('set @newval=?;call usp_search(@newval) ', [newval], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        } else {
            console.log("Search result is  " + JSON.stringify(rows[1]));

            res.end(JSON.stringify(rows[1]));
        }
        res.end();
    });

});

app.get('/itemList', function (req, res) {
    //    res.header("Access-Control-Allow-Origin", "*");
    // var prid = url.parse(req.url, true).query['pr_id'];
    //  var Mark = url.parse(req.url, true).query['Mark'];
    console.log("/itemList");
    connection.query(' call usp_productList()', function (err, rows) {


        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("product  is  " + JSON.stringify(rows[0]));

            res.end(JSON.stringify(rows[0]));
        }
        res.end();
    });

});

app.get('/editlist', function (req, res) {
    //    res.header("Access-Control-Allow-Origin", "*");
    // var pname = url.parse(req.url, true).query['p_name'];
    var patient_id = url.parse(req.url, true).query['user_id'];
    //  var Mark = url.parse(req.url, true).query['Mark'];
    // console.log("/addItem@p_name"+pname);
    connection.query('set @patient_id=?;call usp_edit(@patient_id)', [patient_id], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("NewItem  is  " + JSON.stringify(rows[1]));

            res.end(JSON.stringify(rows[1]));
        }
        res.end();
    });

});

app.post('/insertItem', supportCrossOriginScript, function (req, res) {
    //    res.header("Access-Control-Allow-Origin", "*");
    // var pname = url.parse(req.url, true).query['p_name'];
    var prid = req.body.prid;
    var bno = req.body.bno;
    var edate = req.body.edate;
    var qn = req.body.qn;
    var price = req.body.price;
    //  var Mark = url.parse(req.url, true).query['Mark'];
    console.log("/insertItem@prid" + prid + '@bno' + bno + '@edate' + edate + '@qn' + qn + '@price' + price);
    connection.query('set @pr_id=?; set @bno=?; set @edate=?; set @qn=?; set @price=?; call usp_insertItemDetails(@pr_id,@bno,@edate,@qn,@price)', [prid, bno, edate, qn, price], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("NewItem  is  " + JSON.stringify(rows[5]));

            res.end(JSON.stringify(rows[5]));
        }
        res.end();
    });

});
// app.get('/savereg', function (req, res) {
//     //    res.header("Access-Control-Allow-Origin", "*");
//         var fname = url.parse(req.url, true).query['fname'];
//          var sname = url.parse(req.url, true).query['sname'];
//          var address = url.parse(req.url, true).query['address'];
//          var age = url.parse(req.url, true).query['age'];
//          var dob = url.parse(req.url, true).query['dob'];
//          var gender = url.parse(req.url, true).query['gender'];
//          var phnbr = url.parse(req.url, true).query['phnbr'];

//                 connection.query('set @fname=?;set @sname=?;set @address=?;set @age=?;set @dob=?;set @gender=?;set @phnbr=?;call usp_store(@fname,@sname,@address,@age,@dob,@gender,@phnbr)', [fname,sname,address,age,dob,gender,phnbr], function (err, rows) {
//                     if (err) {
//                         console.log("Problem with MySQL" + err);
//                     }
//                     else {
//                         console.log("addnamess  is  " + JSON.stringify(rows[7]));

//                         res.end(JSON.stringify(rows[7]));
//                     }
//                     res.end();
//                 });

//     });
app.post('/savereg', supportCrossOriginScript, function (req, res) {
    var fname = req.body.fname;
    var sname = req.body.sname;
    var address = req.body.address;
    var age = req.body.age;
    var dob = req.body.dob;
    var gender = req.body.gender;
    var phnbr = req.body.phnbr;
    connection.query('set @fname=?; set @sname=?; set @address=?; set @age=?; set@dob=?; set@gender=?; set@phnbr=?; call usp_store(@fname,@sname,@address,@age,@dob,@gender,@phnbr)', [fname, sname, address, age, dob, gender, phnbr], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("NewItem  is  " + JSON.stringify(rows[7]));

            res.end(JSON.stringify(rows[7]));
        }
        res.end();
    });

});

app.get('/getdetail', supportCrossOriginScript, function (req, res) {

    connection.query('call usp_view()', [], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("  " + JSON.stringify(rows[0]));

            res.end(JSON.stringify(rows[0]));
        }
        res.end();
    });

});

app.get('/deleteuser', supportCrossOriginScript, function (req, res) {

    var patient_id = url.parse(req.url, true).query['user_id'];

    connection.query('set @patient_id=?; call usp_delete(@patient_id)', [patient_id], function (err, rows) {

        if (err) {
            console.log("Problem with MySQL" + err);
        }

        else {
            console.log("  " + JSON.stringify(rows[1]));

            res.end(JSON.stringify(rows[1]));
        }
        res.end();
    });

});

app.post('/deleteuser', supportCrossOriginScript, function (req, res) {

    var patient_id = req.body.user_id;

    connection.query('set @patient_id=?; call usp_delete(@patient_id)', [patient_id], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("deletedlist is " + JSON.stringify(rows[1]));

            res.end(JSON.stringify(rows[1]));
        }
        res.end();
    });

});

app.post('/editlist', supportCrossOriginScript, function (req, res) {
    var patient_id = req.body.patient_id;
    var fname = req.body.fname;
    var sname = req.body.sname;
    var address = req.body.address;
    var age = req.body.age;
    var dob = req.body.dob;
    var gender = req.body.gender;
    var phnbr = req.body.phnbr;
    connection.query('set @patient_id=?; set @fname=?; set @sname=?; set @address=?; set @age=?; set@dob=?; set@gender=?; set@phnbr=?; call usp_update(@patient_id,@fname,@sname,@address,@age,@dob,@gender,@phnbr)', [patient_id, fname, sname, address, age, dob, gender, phnbr], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("NewItem  is  " + JSON.stringify(rows[7]));

            res.end(JSON.stringify(rows[7]));
        }
        res.end();
    });

});


app.post('/login', supportCrossOriginScript, function (req, res) {
    //    res.header("Access-Control-Allow-Origin", "*");
    // var pname = url.parse(req.url, true).query['p_name'];
    var username = req.body.uname;
    var psd = req.body.pswd;
    //  var Mark = url.parse(req.url, true).query['Mark'];
    //   console.log("/insertItem@prid"+prid+'@bno'+bno+'@edate'+edate+'@qn'+qn+'@price'+price);
    connection.query('set @username=?; set @psd=?; call usp_login(@username,@psd)', [username, psd], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("NewItem  is  " + JSON.stringify(rows[2]));

            res.end(JSON.stringify(rows[2]));
        }
        res.end();
    });

});


app.post('/tempappointment', supportCrossOriginScript, function (req, res) {
    //    res.header("Access-Control-Allow-Origin", "*");
    // var pname = url.parse(req.url, true).query['p_name'];
    var patient=req.body.patient_id;
    var special = req.body.spec;
    var doc = req.body.doc;
    var dateapp = req.body.date;
    console.log("temp" + doc);
    //  var Mark = url.parse(req.url, true).query['Mark'];
    //   console.log("/insertItem@prid"+prid+'@bno'+bno+'@edate'+edate+'@qn'+qn+'@price'+price);
    connection.query('set @patient=?; set @special=?; set @doc=?; set @dateapp=?; call usp_tempappmnt(@patient,@special,@doc,@dateapp )', [patient, special, doc, dateapp], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("NewItem  is  " + JSON.stringify(rows[4]));

            res.end(JSON.stringify(rows[4]));
        }
        res.end();
    });

});


app.post('/appointment', supportCrossOriginScript, function (req, res) {
    //    res.header("Access-Control-Allow-Origin", "*");
    // var pname = url.parse(req.url, true).query['p_name'];
    var special = req.body.spec;
    var doc = req.body.doc;
    var patient=req.body.patient_id;
    var dateapp = req.body.date;
    var token = req.body.token;
    console.log("temp" + doc);
    //  var Mark = url.parse(req.url, true).query['Mark'];
    //   console.log("/insertItem@prid"+prid+'@bno'+bno+'@edate'+edate+'@qn'+qn+'@price'+price);
    connection.query('set @special=?; set @doc=?; set @patient=?; set @dateapp=?; set @token=?; call usp_appmnt(@special,@doc,@patient,@dateapp,@token )', [special, doc, patient, dateapp, token], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("NewItem  is  " + JSON.stringify(rows[5]));

            res.end(JSON.stringify(rows[5]));
        }
        res.end();
    });

});


app.get('/specdis', supportCrossOriginScript, function (req, res) {
    connection.query('call usp_select()', [], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("  " + JSON.stringify(rows[0]));

            res.end(JSON.stringify(rows[0]));
        }
        res.end();
    });

});


app.get('/docnm', function (req, res) {

    var dep_id = url.parse(req.url, true).query['dept_id'];

    // console.log("/addItem@p_name"+pname);
    connection.query('set @dep_id=?; call usp_docname(@dep_id)', [dep_id], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("NewItem  is  " + JSON.stringify(rows[1]));

            res.end(JSON.stringify(rows[1]));
        }
        res.end();
    });

});

app.get('/getapp', supportCrossOriginScript, function (req, res) {

    connection.query('call usp_viewapp()', [], function (err, rows) {
        if (err) {
            console.log("Problem with MySQL" + err);
        }
        else {
            console.log("  " + JSON.stringify(rows[0]));

            res.end(JSON.stringify(rows[0]));
        }
        res.end()
    });

});