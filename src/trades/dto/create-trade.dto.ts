import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsString, Max, Min } from "class-validator";
import { TradeType } from "../enum/trade.enum";

export class CreateTradeDto {

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
    @Min(1)
    @Max(100)
    @ApiProperty({ type: Number })
    shares: number;

    @IsInt()
    @ApiProperty({ type: Number })
    price: number;
}
