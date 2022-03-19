import Endpoint from "../../modules/Endpoint";
import db from '../../database/main';
import Response from "../../modules/Response";

export default new Endpoint({
    path: '/image',
    callback: async (req, res, next) => {
        const id = req.query.id;
        console.time('fetch image');
        const image = await db.utils.getImage(id as string);

        console.timeEnd('fetch image');

        console.time('convert image');
        if (!image)
            return res.status(Response.status.NOT_FOUND).send(Response.error({
                message: 'Image not found',
                code: Response.status.NOT_FOUND
            }))
        const base64 = Buffer.from(image.buffer).toString('base64');
        console.timeEnd('convert image');

        res.status(Response.status.OK).send(Response.success({
            message: base64,
            code: Response.status.OK
        }));

        console.log('at image, sent data', image);
    }
})