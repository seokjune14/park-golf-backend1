const pool = require('../config/db');

// 장바구니 조회
const getCartByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query(`
      SELECT 
        c.cartId,
        l.lesName,
        l.lesPrice,
        l.lesThumbImg,
        l.lesPlace,
        l.lesDetailPlace
      FROM cart c
      JOIN lessons l ON c.lessonId = l.lesNum
      WHERE c.userId = ?
    `, [userId]);

    res.json(rows);
  } catch (err) {
    console.error('장바구니 조회 실패:', err);
    res.status(500).json({ error: '서버 오류' });
  }
};

// 장바구니 추가
const addToCart = async (req, res) => {
  const { userId, lessonId } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO cart (userId, lessonId) VALUES (?, ?)',
      [userId, lessonId]
    );
    res.json({ success: true, cartId: result.insertId });
  } catch (err) {
    console.error('장바구니 추가 실패:', err);
    res.status(500).json({ error: '서버 오류' });
  }
};

// 장바구니 삭제
const removeFromCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    await pool.query('DELETE FROM cart WHERE cartId = ?', [cartId]);
    res.json({ success: true });
  } catch (err) {
    console.error('장바구니 삭제 실패:', err);
    res.status(500).json({ error: '서버 오류' });
  }
};

module.exports = {
  getCartByUser,
  addToCart,
  removeFromCart
};
