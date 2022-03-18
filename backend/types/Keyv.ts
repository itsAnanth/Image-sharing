import keyv from '@keyvhq/core';
import { Image } from './Image';



interface UDBMain {
    keyv: keyv<unknown>;
    state: UDBMain;
    cluster: string;
    setImage: (image: Image) => Promise<any>;
    getImage: (id: string) => Promise<Image|null|undefined>;
}

interface DBClient {
    keyv: keyv<unknown>;
    set: keyv<unknown>['set'];
    delete: keyv<unknown>['delete'];
    clear: keyv<unknown>['clear'];
    iterator: keyv<unknown>['iterator'];
}

interface DBMain extends DBClient {
    utils?: UDBMain;
}

type DBMainCluster = {
    images: { [key: string]: Image }
}

export type { DBClient, DBMain, UDBMain, DBMainCluster };
