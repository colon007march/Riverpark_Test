import {getConnection} from "typeorm";
import {Status_Banner} from "../entity/Status_Banner";

let status_bannerinfo = {
    create : async (status) => {
        try {
            let status_banner = new Status_Banner()
            status_banner.status = status
            status_banner.created_date = new Date()
            await getConnection().getRepository(Status_Banner).save(status_banner)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    },
    showall : async () => {
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .select(["status_banner.id","status_banner.status"])
                .from(Status_Banner, "status_banner")
                .execute();
            return JSON.parse(JSON.stringify(result))
        } catch (err) {
            console.log(err)
            return false
        }
    }
}

export default status_bannerinfo