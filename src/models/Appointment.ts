import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

// entidade Entity, qual nome da tabela (appointment)
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /* Quando se tem um relacionamento, deve criar a column e o object que é relacionado com a column */
  /*
   ** Um para Um (OneToOne)
   ** Um para Muitos(OneToMany)
   ** Muitos para Muitos(ManyToMany)
   */

  @Column()
  provider_id: string;

  /* Como essa Table tem um relacionamento entre agendamento e usuarios, temos que estipular qual que é esse relacionamento */
  @ManyToOne(() => User) // - ManyToOne - Muitos agendamentos para um usuario
  @JoinColumn({ name: 'provider_id' }) // Identificando a column de qual usuario que é prestador deste agendamento.
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  uptadet_at: Date;
}

export default Appointment;
