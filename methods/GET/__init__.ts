import Endpoint from "../../modules/Endpoint";

export default new Endpoint({
    path: '/',
    callback: async(req, res) => {
        res.send('Reached');
    }
})