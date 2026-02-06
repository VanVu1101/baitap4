var express = require('express');
var router = express.Router();
var { data: products } = require('../utils/data');

let categories = [
    {
    "id": 7,
    "name": "Clothes",
    "slug": "clothes",
    "image": "https://i.imgur.com/QkIa5tT.jpeg",
    "creationAt": "2026-02-05T16:51:34.000Z",
    "updatedAt": "2026-02-05T16:51:34.000Z"
    },
    {
    "id": 8,
    "name": "Electronics",
    "slug": "electronics",
    "image": "https://i.imgur.com/ZANVnHE.jpeg",
    "creationAt": "2026-02-05T16:51:35.000Z",
    "updatedAt": "2026-02-05T16:51:35.000Z"
    },
    {
    "id": 9,
    "name": "Furniture",
    "slug": "furniture",
    "image": "https://i.imgur.com/Qphac99.jpeg",
    "creationAt": "2026-02-05T16:51:36.000Z",
    "updatedAt": "2026-02-05T16:51:36.000Z"
    },
    {
    "id": 10,
    "name": "Shoes",
    "slug": "shoes",
    "image": "https://i.imgur.com/qNOjJje.jpeg",
    "creationAt": "2026-02-05T16:51:36.000Z",
    "updatedAt": "2026-02-05T16:51:36.000Z"
    },
    {
    "id": 11,
    "name": "Miscellaneous",
    "slug": "miscellaneous",
    "image": "https://i.imgur.com/BG8J0Fj.jpg",
    "creationAt": "2026-02-05T16:51:37.000Z",
    "updatedAt": "2026-02-05T16:51:37.000Z"
    },
    {
    "id": 13,
    "name": "gargantilla",
    "slug": "gargantilla",
    "image": "https://firebasestorage.googleapis.com/v0/b/pruebasalejandro-597ed.firebasestorage.app/o/gargantilla.jpg?alt=media&token=6bbf8234-5112-4ca8-b130-5e49ed1f3140",
    "creationAt": "2026-02-05T21:09:36.000Z",
    "updatedAt": "2026-02-05T21:09:36.000Z"
    },
    {
    "id": 15,
    "name": "category_B",
    "slug": "category-b",
    "image": "https://pravatar.cc/",
    "creationAt": "2026-02-05T22:04:27.000Z",
    "updatedAt": "2026-02-05T22:04:27.000Z"
    },
    {
    "id": 16,
    "name": "string",
    "slug": "string",
    "image": "https://pravatar.cc/",
    "creationAt": "2026-02-05T22:04:28.000Z",
    "updatedAt": "2026-02-05T22:04:28.000Z"
    },
    {
    "id": 17,
    "name": "Anillos",
    "slug": "anillos",
    "image": "https://firebasestorage.googleapis.com/v0/b/pruebasalejandro-597ed.firebasestorage.app/o/Anillos.jpg?alt=media&token=b7de8064-d4eb-4680-a4e2-ad917838c6c8",
    "creationAt": "2026-02-06T02:40:20.000Z",
    "updatedAt": "2026-02-06T02:40:20.000Z"
    },
    {
    "id": 18,
    "name": "Testing Category",
    "slug": "testing-category",
    "image": "https://placeimg.com/640/480/any",
    "creationAt": "2026-02-06T06:04:54.000Z",
    "updatedAt": "2026-02-06T06:04:54.000Z"
    }
];

/* getall - Option to query by name */
router.get('/', function(req, res, next) {
  let queryName = req.query.name;
  if(queryName) {
    let filtered = categories.filter(c => c.name.toLowerCase().includes(queryName.toLowerCase()));
    return res.json(filtered);
  }
  res.json(categories);
});

/* getBySlug */
router.get('/slug/:slug', function(req, res, next) {
    const slug = req.params.slug;
    const category = categories.find(c => c.slug === slug);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
});

/* get products by category id */
router.get('/:id/products', function(req, res, next) {
    const id = parseInt(req.params.id);
    const list = products.filter(p => p.category && p.category.id === id);
    res.json(list);
});

/* getbyID */
router.get('/:id', function(req, res, next) {
    const id = parseInt(req.params.id);
    const category = categories.find(c => c.id === id);
    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
});

/* create */
router.post('/', function(req, res, next) {
    const newCategory = req.body;
    // Simple id generation
    const maxId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) : 0;
    newCategory.id = maxId + 1;
    newCategory.creationAt = new Date().toISOString();
    newCategory.updatedAt = new Date().toISOString();
    
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

/* edit */
router.put('/:id', function(req, res, next) {
    const id = parseInt(req.params.id);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Category not found' });
    }
    
    const updatedData = req.body;
    categories[index] = { ...categories[index], ...updatedData, updatedAt: new Date().toISOString(), id: id };
    res.json(categories[index]);
});

/* delete */
router.delete('/:id', function(req, res, next) {
    const id = parseInt(req.params.id);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Category not found' });
    }
    
    const deleted = categories.splice(index, 1);
    res.json({ message: 'Deleted successfully', category: deleted[0] });
});

module.exports = router;
