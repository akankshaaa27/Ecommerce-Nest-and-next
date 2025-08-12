// import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// @Entity()
// export class Order {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     customerId: number;

//     @Column()
//     productId: number;

//     @Column()
//     quantity: number;
// }

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  customerId: number;

  @Column()
  quantity: number;
}
