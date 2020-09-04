import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Index, ManyToOne
} from "typeorm";
import {Banner} from "./Banner";
@Entity()
export class Status_Banner {

    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column()
    status:string

    @Column()
    created_date : Date;

    @Column()
    updated_date : Date;


    @OneToMany(type => Banner,banner => banner.status_banner, { onDelete: 'CASCADE' })
    banner:Banner[]

}