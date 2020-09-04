import * as express from 'express'
let route = express.Router()

import banner from "./Banner"
import status_banner from "./Status_Banner"

route.get('/',(req, res)=>{
  res.send("Access denied!");
});

route.use('/banner',banner)
route.use('/status_banner',status_banner)

export default route
