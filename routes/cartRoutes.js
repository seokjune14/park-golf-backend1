const express = require('express');
const router = express.Router();
const {
  getCartByUser,
  addToCart,
  removeFromCart
} = require('../controllers/CartController');

// GET /api/cart/:userId - 특정 사용자의 장바구니 조회
router.get('/:userId', getCartByUser);

// POST /api/cart - 장바구니 추가
router.post('/', addToCart);

// DELETE /api/cart/:cartId - 장바구니 항목 삭제
router.delete('/:cartId', removeFromCart);

module.exports = router;
