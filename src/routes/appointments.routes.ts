import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

// Rota: Receber a requisiçao, chamar outro arquivo, devolver uma resposta

const appointmentsRoutes = Router();

// Rota para listar os agendamentos
appointmentsRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointmentList = await appointmentsRepository.find();

  return response.json(appointmentList);
});

appointmentsRoutes.post('/', async (request, response) => {
  try {
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
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRoutes;
