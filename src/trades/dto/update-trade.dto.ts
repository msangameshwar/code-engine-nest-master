import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';
import { TradeType } from '../enum/trade.enum';
import { CreateTradeDto } from './create-trade.dto';

export class UpdateTradeDto extends PartialType(CreateTradeDto) {
    @IsEnum(TradeType)
    @ApiProperty()
    type: TradeType;

    @IsInt()
    @ApiProperty({ type: Number })
    user_id: number;

    @IsString()
    @ApiProperty({ type: String })
    symbol: string;

    @IsInt()
    @Min(0)
    @Max(100)
    @ApiProperty({ type: Number })
    shares: number;

    @IsInt()
    @ApiProperty({ type: Number })
    price: number;
}
