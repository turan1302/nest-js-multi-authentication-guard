import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clients')
export class ClientEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;
}