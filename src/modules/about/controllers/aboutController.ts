import { Request, Response } from 'express';

class AboutController {
  getAbout(request: Request, response: Response) {
    return response.json({
      name: 'Personal Finance API',
      version: '1.0.0',
    });
  }
}

export default AboutController;
