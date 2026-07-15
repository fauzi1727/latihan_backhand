const express = require("express");
const router  = express.Router();
const db = require("../lib/db");
const { types } = require("pg");

const alatData = [];

router.get("/",  async (req, res) => {
   const { name, type, price} = req.query;
   const data = await db.query("SELECT * FROM alat");
   res.json(data.rows);
  });

  router.post("/", async (req, res) => {
  console.log("Menerima request POST /alat dengan body:", req.body);

  const {name, type, price} = req.body;

  const existingAlat = await db.query("SELECT * FROM alat WHERE type = $1" , [type]);
  if(existingAlat.rows.length > 0 ){
   return res.status(400).json({ error: "Type ini sudah digunakan" });
  }

  const createAlat = await db.query("INSERT INTO alat (name, type, price) VALUES ($1, $2, $3) RETURNING *", [name, type, price]);
 res.status(201).json(createAlat.rows[0]);
});
 
   router.delete("/:id", async (req, res) => {
      const { id } = req.params;
   console.log("Menerima request DELETE /alat by id:", req.params.id);
      const deletealat = await db.query ("DELETE FROM alat WHERE id = $1 RETURNING *", [id],);

      if (deletealat.rows.length === 0) {
         return res.status(404).json({ error: "Pengguna tidak di temukan"});
      }
      res.json ({mesej: "alat telah dihapus", alat_di_delete: deletealat.rows[0],});
   });

router.put("/:id", async (req, res) => {
      const { id } = req.params;
      const {name, type, price} = req.body;
   console.log("Menerima request update /alat by id:", id, "data update", req.body,);
      if (!name || !type || !price) {
         return res.status(400).json({ erroe: "error di update"})};
       const updatealat = await db.query ("UPDATE alat SET name = $1, type = $2, price = $3 WHERE id = $4 RETURNING *", [name, type, price, id] ,);
       if(updatealat.rows.length === 0) {
   return res.status(404).json({ elor: "data ga jadi update"})};
   res.json({mesej:"alat berhasil di update", data_terupdate: updatealat.rows[0],
   });
});



module.exports = router;