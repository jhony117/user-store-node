import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';




export class FileUploadRoutes {


  static get routes(): Router {

    const router = Router();
    const controller = new  FileUploadController(
      new FileUploadService
    );
    
    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );

// api/upload/single/<user>|category|products>/
// api/upload/multiple/<user>|category|products>/

router.use(FileUploadMiddleware.containFiles);
router.use(TypeMiddleware.validTypes(['users', 'products', 'categories']));


    router.post('/single/:type',  controller.uploadFile);
    router.post('/multiple/:type',controller.uploadMultipleFIle);



    return router;
  }


}

