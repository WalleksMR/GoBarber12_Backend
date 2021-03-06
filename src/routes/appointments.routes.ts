import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

// Rota: Receber a requisiçao, chamar outro arquivo, devolver uma resposta

const appointmentsRoutes = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRoutes.get('/', (request, response) => {
  const appointmentList = appointmentsRepository.all();
  return response.json(appointmentList);
});

appointmentsRoutes.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );
    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRoutes;
