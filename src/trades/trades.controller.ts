import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TradesService } from './trades.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { OptionalQuery } from './dto/query-trade.dto';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) { }

  @Post()
  create(@Body() createTradeDto: CreateTradeDto) {
    return this.tradesService.create(createTradeDto);
  }

  @Get()
  findAll(@Query() query: OptionalQuery) {

    const { type, user_id } = query;

    if (!type && !user_id) {
      return this.tradesService.findAll();
    }
    if (user_id && !type) {
      return this.tradesService.findByUserId(parseInt(user_id));
    }
    if (type && !user_id) {
      return this.tradesService.findByType(type)
    }
    return this.tradesService.findByQuery(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradesService.findOne(parseInt(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTradeDto: UpdateTradeDto) {
    return this.tradesService.update(+id, updateTradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradesService.remove(+id);
  }
}
