import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PostgresConfigService } from './infra/database/postgres.config.service';
import { HashPasswordHelper } from './helpers/hash-password-helper/hash-password-helper';
import { MedicineModule } from './medicine/medicine.module';
import { TechnicalResponsibleModule } from './technical-responsible/technical-responsible.module';

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
    MedicineModule,
    TechnicalResponsibleModule,
  ],
  controllers: [],
  providers: [HashPasswordHelper],
})
export class AppModule {}
