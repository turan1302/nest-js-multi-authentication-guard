import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class AdminDto {
    @IsString( { message: 'Name is required' })
    @IsNotEmpty( { message: 'Name is required' })
    name!: string;

    @IsString( { message: 'Email is required' })
    @IsNotEmpty( { message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    email!: string;

    @IsString( { message: 'Password is required' })
    @IsNotEmpty( { message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(20, { message: 'Password must be at most 20 characters long' })
    password!: string;
}