import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { LoginModule } from './login/login.module';


@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: '.env'
  }),
  TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'postgres',
  port: Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USERNAME || 'postgres',
  password: process.env.TYPEORM_PASSWORD || 'postgres',
  database: process.env.TYPEORM_DATABASE || 'postgres',
  autoLoadEntities: true,
  entities: ['dist/**/entities/*entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  migrations: ['dist/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'dist/migrations'
}
}),UsersModule, BoardsModule, TasksModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
