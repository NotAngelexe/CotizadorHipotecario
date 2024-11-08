import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Admin' });
});

router.route("/:id")
.get((req, res) => {
  const {id}=req.params;
  res.json({ msg: `has consultado al Admin ${id}`});
});

export default router;
