import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateAvailability,
  updateProduct
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middlewares";

const router = Router();

router.get('/', getProducts);

router.get('/:id',
  param('id').isInt().withMessage('Not Valid ID')
    .custom(value => value > 0).withMessage('Not Valid ID'),
  handleInputErrors,
  getOneProduct
);


router.post('/',
  body('name').notEmpty().withMessage('Product name is required'),
  body('price')
    .isNumeric().withMessage('Not valid price')
    .notEmpty().withMessage('Product price is required')
    .custom(value => value > 0).withMessage('Not valid price'),
  handleInputErrors,
  createProduct
);

router.put('/:id',
  body('name').notEmpty().withMessage('Product name is required'),
  body('price')
    .isNumeric().withMessage('Not valid price')
    .notEmpty().withMessage('Product price is required')
    .custom(value => value > 0).withMessage('Not valid price'),
  body('availability')
    .isBoolean().withMessage('Availability value is not Valid'),
  handleInputErrors,
  updateProduct
);

router.patch('/:id',
  param('id').isInt().withMessage('Not Valid ID')
    .custom(value => value > 0).withMessage('Not Valid ID'),
  handleInputErrors,
  updateAvailability
);

router.delete('/:id',
  param('id').isInt().withMessage('Not Valid ID')
    .custom(value => value > 0).withMessage('Not Valid ID'),
  handleInputErrors,
  deleteProduct
);


export default router;