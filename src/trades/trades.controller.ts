import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TradesService } from './trades.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { OptionalQuery } from './dto/query-trade.dto';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post()
  create(@Body() createTradeDto: CreateTradeDto) {
    return this.tradesService.create(createTradeDto); // save new trade
  }

  @Get()
  findAll(@Query() query: OptionalQuery) {
    const { type, user_id } = query;

    if (!type && !user_id) {
      return this.tradesService.findAll(); //find all trade
    }
    if (user_id && !type) {
      return this.tradesService.findByUserId(parseInt(user_id)); // find trade based on user_id
    }
    if (type && !user_id) {
      return this.tradesService.findByType(type); // find trade based on type
    }
    return this.tradesService.findByQuery(query); // find trade based on query parameter
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradesService.findOne(parseInt(id)); // find trade by ID
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTradeDto: UpdateTradeDto) {
    return this.tradesService.update(+id, updateTradeDto); // Updated trade
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradesService.remove(+id); // delete trade
  }
}
