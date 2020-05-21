import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMonthAvailabilityService from '@modules/appointments/services/ListMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const lisProviderMonthAvailability = container.resolve(
      ListMonthAvailabilityService,
    );

    const availability = await lisProviderMonthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
