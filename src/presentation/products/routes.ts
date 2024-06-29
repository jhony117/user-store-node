import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductController } from './controller';
import { ProductService } from '../services/product.service';




export class ProductsRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    // router.use('/api/todos', /*TodoRoutes.routes */ );

    const productService =new ProductService();
    const controller = new ProductController(productService);


    router.get('/',  controller.getProducts);
    router.post('/',[AuthMiddleware.validateJWT],controller.createProduct);



    return router;
  }


}

