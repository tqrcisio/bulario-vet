import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostgresConfigService } from './database/postgres.config.service';
import { HashPasswordHelper } from './helpers/hash-password-helper/hash-password-helper';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [HashPasswordHelper],
})
export class AppModule {}
