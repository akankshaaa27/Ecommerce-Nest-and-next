// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CustomerModule } from './customer/customer.module';
// import { ConfigModule } from '@nestjs/config';

// @Module({
//   imports: [
//         // PostgreSQL config

//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),

//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: process.env.DB_HOST,
//       port: parseInt(process.env.DB_PORT || '5432', 10),
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//       autoLoadEntities: true,
//       synchronize: true,
//     }),
//     CustomerModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule { }



import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URI,
      useUnifiedTopology: true,
      synchronize: true, // ⚠ For dev only
      autoLoadEntities: true,
    }),
    CustomerModule,
  ],
})
export class AppModule {}
