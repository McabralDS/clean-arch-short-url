import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UrlTypeOrmEntity } from './url/infrastructure/database/typeorm/url.typeorm.entity';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'better-sqlite3',
    database: 'database.sqlite',
    synchronize: true,
    logging: false,
    entities: [UrlTypeOrmEntity],
    autoLoadEntities: true,
}