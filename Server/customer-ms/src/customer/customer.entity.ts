import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export class Customer {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mobile: string;
}
