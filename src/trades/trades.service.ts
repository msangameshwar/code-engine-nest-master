import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTradeDto } from './dto/create-trade.dto';
import { OptionalQuery } from './dto/query-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Trade } from './entities/trade.entity';
import { TradeType } from './enum/trade.enum';

@Injectable()
export class TradesService {

  constructor(
    @InjectRepository(Trade)
    private tradesRepository: Repository<Trade>,
  ) { }

  async create(createTradeDto: CreateTradeDto) {
    try {
      
      const newTrade = await this.tradesRepository.save(createTradeDto);
      if (!newTrade) {
        throw new BadRequestException('Failed to save new trade')
      }
      return newTrade;
    }
    catch (error) {
      return error;
    }
  }

  async findAll() {
    const data = await this.tradesRepository.find();
    if (data) {
      return data;
    }
    return 'No data found!!!'
  }

  async findOne(id: number) {
    const data = await this.tradesRepository.findOne({ where: { id: id } });
    if (data) {
      return data;
    }
    throw new BadRequestException('ID is not available!!!');
  }

  async findByUserId(user_id: number) {
    const data = await this.tradesRepository.find({ where: { user_id: user_id } });
    if (data) {
      return data;
    }
    return 'No data found!!!!!!'
  }

  async findByType(type: string) {
    const data = await this.tradesRepository.find({ where: { type: type } });
    if (data) {
      return data;
    }
    return 'No data found!!!!!!'
  }
  async findByQuery(query: OptionalQuery) {

    const data = await this.tradesRepository.find({ where: { type: query.type, user_id: parseInt(query.user_id) } });
    if (data) {
      return data;
    }
    return 'No data found!!!!!!'
  }

  async update(id: number, updateTradeDto: UpdateTradeDto) {
    try {

      const updateUser = await this.tradesRepository.update(id, updateTradeDto);

      if (!updateUser) {
        throw new BadRequestException('ID is not available!!!');
      }
      return this.tradesRepository.findOne({ where: { id: id } });

    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const del = await this.tradesRepository.delete(id);
      if (del.affected == 1) {
        return 'Trade deleted successfully!!!'
      }
      throw new BadRequestException('ID is not available!!!');

    } catch (error) {
      return error;
    }
  }
}
