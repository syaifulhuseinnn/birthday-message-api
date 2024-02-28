import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ name: 'email', type: 'varchar' })
  email: string;

  @Column({ name: 'location', type: 'varchar' })
  location: string;

  @Column({ name: 'birthday_date', type: 'date' })
  birthdayDate: Date;

  @Column({
    name: 'last_sent_message',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  lastSentMessage: string;

  @Column({
    name: 'next_send_message',
    type: 'timestamptz',
  })
  nextSendMessage: string;
}
