type ImagePayload = {
    buffer: Buffer;
    title: string;
    timestamp: number;
}


interface Image extends ImagePayload {
    id: string;
};


export type { Image, ImagePayload };

