import DBClient from './Db';
import keyv from '@keyvhq/core';
import type { DBMain as IDBM, UDBMain as IUDBM, DBMainCluster } from '../types/Keyv';
import { Image } from '../types/Image';

const db: IDBM = new DBClient('main');

interface DBUtils extends IUDBM { };

class DBUtils {

    constructor(keyv: keyv) {
        this.state = this;
        this.keyv = keyv;
        this.cluster = 'x1'
    }


    async get(id: string) {
        let val = (await this.keyv.get(id) as (null|DBMainCluster|undefined));
        return val ? val : { image: null };
    }

    async setImage(id: string, image: Image) {
        const res = await this.get(id);
        res.image = image;
        await this.keyv.set(id, res);
    }

    async getImage(id: string): Promise<Image|null|undefined> {
        return (await this.get(id)).image;
    }

}

db.utils = new DBUtils(db.keyv);


export default db;
