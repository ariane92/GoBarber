import { Router } from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentsController();

appointmentsRouter.use(ensureAutheticated);
/* appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
}); */

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
