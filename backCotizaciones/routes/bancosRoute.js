import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Banco' });
});

router.put('/',(req,res)=>{
 res.json({msg:'Ingreso Bancos'})
});

router.route("/:id")
.get((req, res) => {
  res.json({ msg: 'has consultado banco'});
})
.delete((req,res)=>{
  res.json({ msg: 'eliminando Banco'});
})
.put((req,res)=>{
  res.json({msg:'Ingreso Banco'})
});

export default router;
