import "reflect-metadata";
import condition from "../../../condition/input";
import status_bannerinfo from "../../../model/Status_Banner";
let express = require("express")
let bodyParser = require("body-parser")
let app = express.Router()
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,accesstoken");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/create',async (req, res) => {
    let status = req.body.status
    if (!condition.one_value(status)){
        res.status(400).json({
            statusName: 'Encounter problems'
        })
    }
    if (await status_bannerinfo.create(status) === false) {
        res.status(400).json({
            statusName: '์Recording failed'
        })
    }
    res.status(200).json({
        statusName: '์Recording successfull'
    })
})

app.get('/dropdown-status',async (req, res) => {
            let accessoryList = await status_bannerinfo.showall()
            res.status(200).json({
                statusName: 'success',
                list_status: accessoryList
            })
})

export default app