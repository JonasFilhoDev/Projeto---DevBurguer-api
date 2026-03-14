import * as Yup from 'yup';
import Product from './../models/Product.js';
import Category from './../models/Category.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

  
    if (!request.file) {
      return response.status(400).json({ error: 'Product image is required' });
    }

    const { name, price, category_id, offer } = request.body;
    const { path: cloudinaryPath } = request.file;

    const newProduct = await Product.create({
      name,
      price: Number(price),
      category_id: Number(category_id),
      path: cloudinaryPath,
      offer,
    });

    return response.status(201).json(newProduct);
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, price, category_id, offer } = request.body;
    const { id } = request.params;

    const productUpdates = {};
    if (name) productUpdates.name = name;
    if (price) productUpdates.price = Number(price);
    if (category_id) productUpdates.category_id = Number(category_id);
    if (offer !== undefined) productUpdates.offer = offer;

    if (request.file) {
      const { path: cloudinaryPath } = request.file;
      productUpdates.path = cloudinaryPath;
    }

    await Product.update(productUpdates, {
      where: { id },
    });

    return response.status(200).json();
  }

  async index(_request, response) {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    });

    return response.status(200).json(products);
  }
}

export default new ProductController();