import { config } from 'dotenv';
import type { DBClient as IDBC } from '../types/Keyv';
import Keyv from '@keyvhq/core';
import KeyvMongo from '@keyvhq/mongo';

config();

interface DBClient extends IDBC { };

class DBClient {

    constructor(collection: string) {
        const store = new KeyvMongo(process.env.MONGO_URL, {
            collection: collection
        });

        const keyv = new Keyv({
            store: store
        });
        keyv.on('error', (...error) => console.error('keyv error: ', ...error));

        this.keyv = keyv;

        this.set = keyv.set.bind(keyv);
        this.delete = keyv.delete.bind(keyv);
        this.clear = keyv.clear.bind(keyv);
        this.iterator = keyv.iterator.bind(keyv);
        return this;
    }

    async values() {
        const iterator = await this.iterator();
        const values = [];
        // @ts-ignore
        for await (const [, value] of iterator)
            values.push(value);
        return values;
    }
}

export default DBClient;