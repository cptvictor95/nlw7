import { Request, Response } from "express";
import { GetUserProfileService } from "../services/GetUserProfileService";

class GetUserProfileController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const service = new GetUserProfileService();

    try {
      const result = await service.execute(user_id);

      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { GetUserProfileController };
