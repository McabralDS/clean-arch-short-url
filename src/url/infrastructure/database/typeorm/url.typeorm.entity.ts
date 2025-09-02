import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'urls'})
export class UrlTypeOrmEntity {
    @PrimaryColumn()
    shortenedUrl: string;
    
    @Column()
    originalUrl: string;

    @Column({type: 'int'})
    clicks: number;

    @Column()
    createdAt: string;
}