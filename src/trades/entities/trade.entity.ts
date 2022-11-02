import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trade')
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  user_id: number;

  @Column()
  symbol: string;

  @Column()
  shares: number;

  @Column()
  price: number;
}
