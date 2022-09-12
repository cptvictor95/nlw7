import { Request, Response } from "express";
import { GetLastMessagesService } from "../services/GetLastMessagesService";

class GetLastMessagesController {
  async handle(request: Request, response: Response) {
    const service = new GetLastMessagesService();

    try {
      const result = await service.execute();

      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { GetLastMessagesController };
