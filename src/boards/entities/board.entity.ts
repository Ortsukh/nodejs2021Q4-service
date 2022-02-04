import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
  } from 'typeorm';
  import ColumnEntity from './column_entity';
  
  @Entity({ name: 'board' })
  export default class BoardEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;
  
    @OneToMany(() => ColumnEntity, (column) => column.board, {
      cascade: true,
    })
    columns: ColumnEntity[];
  }
  