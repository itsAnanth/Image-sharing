import keyv from '@keyvhq/core';
import { Image } from './Image';



interface UDBMain {
    keyv: keyv<unknown>;
    state: UDBMain;
    cluster: string;
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
    images: Map<string, Image>
}

export type { DBClient, DBMain, UDBMain, DBMainCluster };
