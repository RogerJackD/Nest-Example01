import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateCarDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly brand? : string;
    
    @IsOptional()
    @IsString()
    readonly model? : string;

}