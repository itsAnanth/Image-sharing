import keyv from '@keyvhq/core';



interface UDBMain {
    keyv: keyv<unknown>;
    state: UDBMain;
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

export type { DBClient, DBMain, UDBMain };
