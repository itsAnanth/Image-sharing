import type { Request, Response } from 'express';
import Image from '../database/models/Image.model';


const stream = (request: Request, response: Response) => {
    Image.findOne
}