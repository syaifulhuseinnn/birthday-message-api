import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findAllByBirthdayDate(timestamp: string): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.next_send_message = :timestamp', {
        timestamp: timestamp,
      })
      .getMany();
  }

  findAllByNextSendMessage(currentDatetime: string): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.next_send_message < :currentDatetime', {
        currentDatetime: currentDatetime,
      })
      .getMany();
  }

  findOne(userId: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ userId });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(user_id: number): Promise<void> {
    await this.usersRepository.delete(user_id);
  }
}
