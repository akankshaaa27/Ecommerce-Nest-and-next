// import { Module } from '@nestjs/common';
// import { ProductService } from './product.service';
// import { ProductController } from './product.controller';

// @Module({
//   providers: [ProductService],
//   controllers: [ProductController]
// })
// export class ProductModule {}

// src/product/product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // ✅ Register entity here
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
