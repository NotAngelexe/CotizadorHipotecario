import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Prestamo' });
});

router.put('/',(req,res)=>{
 res.json({msg:'Ingreso Prestamos'})
});

router.route("/:id")
.get((req, res) => {
  res.json({ msg: 'has consultado prestamo'});
})
.delete((req,res)=>{
  res.json({ msg: 'eliminando prestamo'});
})
.put((req,res)=>{
  res.json({msg:'Ingreso Prestamo'})
});

export default router;
