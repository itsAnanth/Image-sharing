import { upload } from "../../controller/upload";
import Endpoint from "../../modules/Endpoint";

export default new Endpoint({
    path: '/',
    callback: async(req, res, next) => {
        upload(req, res);
    }
})