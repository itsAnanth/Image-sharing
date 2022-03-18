import Endpoint from "../../modules/Endpoint";
import db from '../../database/main';
import Response from "../../modules/Response";

export default new Endpoint({
    path: '/image',
    callback: async (req, res, next) => {
        const id = req.query.id;
        const image = await db.utils.getImage(id as string);
        if (!image)
            return res.status(Response.status.NOT_FOUND).send(Response.error({
                message: 'Image not found',
                code: Response.status.NOT_FOUND
            }))
        const base64 = Buffer.from(image.buffer).toString('base64');
        console.log(image);

        const index_file =
            `<html lang="en">
        <body>
            <img width="30px" height="30px" src="data:image/png;base64,${base64}" alt="img">
            
        </body>
        </html>`;

        res.send(index_file);
        //06381a1a-6360-41f2-9dca-f232cb60c3cd
        // console.log(await db.utils.getImage(id as string));        
    }
})