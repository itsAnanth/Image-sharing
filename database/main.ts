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


    async get() {
        let val = (await this.keyv.get(this.cluster) as (null|DBMainCluster|undefined));
        if (!val) {
            val = {
                images: new Map()
            };
        }
        return val;
    }

    async setImage(image: Image) {
        const res = await this.get();
        res.images.set(image.id, image);
        await this.keyv.set(this.cluster, res);
    }

    async getImage(id: string): Promise<Image|null|undefined> {
        return (await this.get()).images.get(id);
    }

}

db.utils = new DBUtils(db.keyv);
