import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from "typeorm";
import {Status_Banner} from "./Status_Banner";
@Entity()
export class Banner {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image:string

    @Column()
    link:string

    @Column()
    order: number;

    @Column()
    created_date : Date;

    @Column()
    updated_date : Date;

    @ManyToOne(type => Status_Banner,status_banner => status_banner.banner, { onDelete: 'CASCADE' })
    status_banner:Status_Banner

}