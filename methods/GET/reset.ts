import Endpoint from "../../modules/Endpoint";
import db from '../../database/main';
import stream from 'stream';
import fs from 'fs';
import Response from "../../modules/Response";

const status = Response.status; 

export default new Endpoint({
    path: '/reset',
    callback: async(req, res, next) => {
        const key = req.query.key;
        if (key != '1') return res.status(status.UNAUTHORIZED).send(Response.error({
            message: 'Invalid key',
            code: status.UNAUTHORIZED
        }));
        await db.clear();
    }
})