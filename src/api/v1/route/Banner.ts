import "reflect-metadata";
import condition from "../../../condition/input";
import bannerinfo from "../../../model/Banner";
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
        let image = req.body.image
        let link = req.body.link
        let status_id = req.body.status_id
        if (!condition.three_values(image,link,status_id)){
            res.status(400).json({
                statusName: 'Encounter problems'
            })
        }
        if (await bannerinfo.create(image,link,status_id) === false) {
            res.status(400).json({
                statusName: '์Recording failed'
            })
        }
        res.status(200).json({
            statusName: '์Recording successfull'
        })
})

app.post('/edit',async (req, res) => {
    let banner_id = req.body.banner_id
    let image = req.body.image
    let link = req.body.link
    let status_id = req.body.status_id
    if (!condition.three_values(image,link,status_id)){
        res.status(400).json({
            statusName: 'Encounter problems'
        })
    }
    if (await bannerinfo.edit(banner_id,image,link,status_id) === false) {
        res.status(400).json({
            statusName: '์Recording failed'
        })
    }
    res.status(200).json({
        statusName: '์Recording successfull'
    })
})

app.get('/home-banner',async (req, res) => {
        let list_banner = await bannerinfo.home_banner()
        res.status(200).json({
            statusName: 'success',
            list_banner: list_banner
        })
})

app.get('/list-banner',async (req, res) => {
    let accessoryList = await bannerinfo.showall()
    res.status(200).json({
        statusName: 'success',
        list_banner: accessoryList
    })
})

app.post('/show-banner',async (req, res) => {
    let banner_id = req.body.banner_id
    if (!condition.one_value(banner_id)){
        res.status(400).json({
            statusName: 'Encounter problems'
        })
    }
    let banner = await bannerinfo.show_banner(banner_id)
    res.status(200).json({
        statusName: 'success',
        banner:banner
    })
})

app.post('/up-banner',async (req, res) => {
    let banner_id = req.body.banner_id
    if (!condition.one_value(banner_id)){
        res.status(400).json({
            statusName: 'Encounter problems'
        })
    }
    if (await bannerinfo.up_order(banner_id) === false) {
        res.status(400).json({
            statusName: '์Recording failed'
        })
    }
    res.status(200).json({
        statusName: '์Recording successfull'
    })
})

app.post('/down-banner',async (req, res) => {
    let banner_id = req.body.banner_id
    if (!condition.one_value(banner_id)){
        res.status(400).json({
            statusName: 'Encounter problems'
        })
    }
    if (await bannerinfo.down_order(banner_id) === false) {
        res.status(400).json({
            statusName: '์Recording failed'
        })
    }
    res.status(200).json({
        statusName: '์Recording successfull'
    })
})

export default app