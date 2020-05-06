import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

export default {
  avatarsDirectory: resolve(__dirname, '..', '..', 'tmp', 'avatars'),
  publicationsDirectory: resolve(__dirname, '..', '..', 'tmp', 'publications'),
  storage: multer.diskStorage({
    destination(request, file, callback) {
      const dist =
        file.fieldname === 'publication'
          ? resolve(__dirname, '..', '..', 'tmp', 'publications')
          : resolve(__dirname, '..', '..', 'tmp', 'avatars');

      return callback(null, dist);
    },
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString('HEX');
      const fileHash = `${hash}-${file.originalname}`;

      return callback(null, fileHash);
    },
  }),
};
