import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAutheticated';

// Rota: Receber a requisiçao, chamar outro arquivo, devolver uma resposta

const appointmentsRoutes = Router();
appointmentsRoutes.use(ensureAuthenticated); // Middleware para autenticação

// Rota para listar os agendamentos
appointmentsRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointmentList = await appointmentsRepository.find();
  return response.json(appointmentList);
});

appointmentsRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  // Convertando string para Data
  const parsedDate = parseISO(date);

  // Regra de negocio
  const createAppointment = new CreateAppointmentService();

  // Executa a criacao do agendamento
  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRoutes;
