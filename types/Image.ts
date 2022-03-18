type ImagePayload = {
    buffer: Buffer;
    title: string;
    timestamp: number;
    contentType: string;
}


interface Image extends ImagePayload {
    id: string;
};


export type { Image, ImagePayload };

