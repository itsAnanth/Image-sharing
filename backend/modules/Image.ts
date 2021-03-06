import type { Image as IImage, ImagePayload } from '../types/Image';
import uuid from 'uuid-random';
interface Image extends IImage { };

class Image {
    constructor({ buffer, title, timestamp, contentType }: ImagePayload) {
        this.buffer = buffer;
        this.title = title;
        this.timestamp = timestamp;
        this.contentType = contentType;
        this.id = uuid();
    }
}

export default Image;