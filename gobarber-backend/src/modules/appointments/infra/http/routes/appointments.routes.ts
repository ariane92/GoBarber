import { Router } from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentsController();

appointmentsRouter.use(ensureAutheticated);

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
