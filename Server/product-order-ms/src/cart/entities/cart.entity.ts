import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;
}
