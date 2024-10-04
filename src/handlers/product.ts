import { Request, Response } from "express";
import Product from "../models/Product.model";


export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
    res.json({ data: products });

  } catch (error) {
    console.log(error);
  }
}

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not Found ' });
    }

    res.json({ data: product });

  } catch (error) {
    console.log(error);
  }
}

export const createProduct = async (req: Request, res: Response) => {
  //Instanciando
  // const product = new Product(req.body);
  // const savedProduct = await product.save();

  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });

  } catch (error) {
    console.log(error);
  }

}

export const updateProduct = async (req: Request, res: Response) => {

  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not Found ' });
    }

    //UPDATE
    await product.update(req.body);
    await product.save();

    res.json({ data: product });

  } catch (error) {
    console.log(error);
  }
}

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not Found ' });
    }

    //UPDATE
    product.availability = !product.dataValues.availability;
    await product.save();

    res.json({ data: product });

  } catch (error) {
    console.log(error);
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.destroy({
      where: {
        id: id
      }
    });

    if(deletedProduct === 0) {
      return res.status(404).json({ error: 'Product Not Found' });
    }

    res.status(200).json({ message : 'Product removed' });

  } catch (error) {
    console.log(error);
  }
}