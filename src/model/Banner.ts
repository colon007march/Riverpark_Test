import {getConnection} from "typeorm";
import {Banner} from "../entity/Banner";
import {Status_Banner} from "../entity/Status_Banner";

let bannerinfo = {
    create : async (image,link,status_id) => {
        try {
            const order = await getConnection()
                .createQueryBuilder()
                .select(["COUNT(banner.id) as count" ])
                .from(Banner, "banner")
                .getRawOne();
            let max_order =  JSON.parse(JSON.stringify(order))
            let new_order = parseInt(max_order.count) + 1
            let banner = new Banner()
            banner.image = image
            banner.link = link
            banner.order = new_order
            banner.status_banner = await getConnection().getRepository(Status_Banner).findOne({id:status_id})
            banner.created_date = new Date()
            await getConnection().getRepository(Banner).save(banner)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    },
    home_banner : async () => {
        try {
            let status = "Active"
            const result = await getConnection()
                .createQueryBuilder()
                .select(["banner.id","banner.image","banner.link"])
                .from(Banner, "banner")
                .innerJoin("banner.status_banner", "status_banner")
                .where("status_banner.status = :status ", {status:status})
                .orderBy("banner.order")
                .execute();
            return JSON.parse(JSON.stringify(result))
        } catch (err) {
            console.log(err)
            return false
        }
    },
    showall : async () => {
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .select(["banner.id","banner.created_date","banner.image","banner.link","banner.order","status_banner.status"])
                .from(Banner, "banner")
                .innerJoin("banner.status_banner", "status_banner")
                .execute();
            return JSON.parse(JSON.stringify(result))
        } catch (err) {
            console.log(err)
            return false
        }
    },
    show_banner : async (banner_id) => {
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .select(["banner.id","banner.image","banner.link","status_banner.status"])
                .from(Banner, "banner")
                .innerJoin("banner.status_banner", "status_banner")
                .where("banner.id = :banner_id ", {banner_id:banner_id})
                .execute();
            return JSON.parse(JSON.stringify(result))
        } catch (err) {
            console.log(err)
            return false
        }
    },
    up_order : async (banner_id) => {
        try {
            const data = await getConnection()
                .createQueryBuilder()
                .select(["banner.order"])
                .from(Banner, "banner")
                .where("banner.id = :banner_id ", {banner_id:banner_id})
                .getRawOne();
            let order_banner =  JSON.parse(JSON.stringify(data))
            let old_banner = await getConnection().getRepository(Banner).findOne({order:order_banner.banner_order - 1})
            if(old_banner != undefined){
                old_banner.order = order_banner.banner_order
                old_banner.updated_date = new Date()
                await getConnection().getRepository(Banner).save(old_banner)
                let new_banner = await getConnection().getRepository(Banner).findOne({id:banner_id})
                new_banner.order = order_banner.banner_order - 1
                new_banner.updated_date = new Date()
                await getConnection().getRepository(Banner).save(new_banner)
                return true
            }else {
                return true
            }
        } catch (err) {
            console.log(err)
            return false
        }
    },
    down_order : async (banner_id) => {
        try {
            const data = await getConnection()
                .createQueryBuilder()
                .select(["banner.order"])
                .from(Banner, "banner")
                .where("banner.id = :banner_id ", {banner_id:banner_id})
                .getRawOne();
            let order_banner =  JSON.parse(JSON.stringify(data))
            let old_banner = await getConnection().getRepository(Banner).findOne({order:order_banner.banner_order + 1})
            if(old_banner != undefined){
                old_banner.order = order_banner.banner_order
                old_banner.updated_date = new Date()
                await getConnection().getRepository(Banner).save(old_banner)
                let new_banner = await getConnection().getRepository(Banner).findOne({id:banner_id})
                new_banner.order = order_banner.banner_order + 1
                new_banner.updated_date = new Date()
                await getConnection().getRepository(Banner).save(new_banner)
                return true
            }else {
                return true
            }
        } catch (err) {
            console.log(err)
            return false
        }
    },
    edit : async (banner_id,image,link,status_id) => {
        try {
            let banner = await getConnection().getRepository(Banner).findOne({id: banner_id})
            banner.image = image
            banner.link = link
            banner.status_banner = await getConnection().getRepository(Status_Banner).findOne({id: status_id})
            banner.updated_date = new Date()
            await getConnection().getRepository(Banner).save(banner)
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    },
}

export default bannerinfo