import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { TradeType } from "../enum/trade.enum";

export class OptionalQuery {
    @IsOptional()
    @IsEnum(TradeType)
    @ApiProperty()
    @ApiPropertyOptional()
    type?: TradeType;

    @IsOptional()
    @ApiProperty()
    @ApiPropertyOptional()
    user_id?: string;
}