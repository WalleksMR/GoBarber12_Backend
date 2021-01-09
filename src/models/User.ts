import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// ?KISS - Keep it Simple & Stupid (Mantenha Simple e Estúpido seu codigo)

// entidade Entity, qual nome da tabela (users)
@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  uptadet_at: Date;
}

export default User;
