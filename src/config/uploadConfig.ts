import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';



export default {
  directory: resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    destination:function (req, file, cb) {
      const dist = file.fieldname ==='avatar' ?resolve(__dirname, '..', '..', 'tmp','avatars'):
       resolve(__dirname, '..', '..', 'tmp','publications') ;

      cb(null, dist)
    },
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname} `;
     
      return callback(null, fileName);
    },
  }),
};

