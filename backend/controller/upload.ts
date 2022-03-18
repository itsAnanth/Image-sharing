import type { Request, Response } from 'express';
import db from '../database/main'
import Image from '../modules/Image';


const upload = async (request: Request, response: Response) => {
    if (!request.files) return;
    if (!(request.files instanceof Array)) return;
    const file = request.files[0]

    const image = new Image({
        title: file.originalname,
        buffer: file.buffer,
        contentType: file.encoding,
        timestamp: Date.now()
    })

    await db.utils.setImage(image);

    console.log('image saved with id ' + image.id);

    console.log(await db.utils.getImage(image.id))
}


export { upload };