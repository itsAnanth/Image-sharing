import path from "path";
import db from "../../database/main";
import Endpoint from "../../modules/Endpoint";

export default new Endpoint({
    path: '/',
    callback: async(req, res, next) => {
        // res.sendFile(path.resolve(__dirname, '/../../public/index.html'));
    }
})