import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb"; // comes from MongoDB library
import Sale from '../models/sale.mjs';
import e from "express";

const router = express.Router();

// Index - Find all sales
router.get('/', async (req, res) => {
    let foundSales = await Sale.find().limit(25)
    res.status(200).json({
      foundSales: foundSales
    })
  })

// GET sales within a date range
router.get('/date/:startDate/:endDate', async (req, res) => {
    const { startDate, endDate } = req.params;
  
    try {
      const foundSales = await Sale.find({
        saleDate: { $gte: startDate, $lte: endDate }
      }).limit(25);
  
      res.status(200).json({
        foundSales: foundSales
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

// POST - Create a sale
router.post("/", async (req, res) => {
    let newSale = req.body;

    try {
        const result = await Sale.create(newSale);
        res.status(204).send(result);
    } catch (error) {
        console.error(e);
        res.status(404).send("Not Found");
    }
});

// GET a single sale entry
router.get("/:id", async (req, res) => {
    let foundSale = await Sale.findById(req.params.id)
    res.status(200).json({
        data: foundSale
    });
});

// PATCH - Add an item to a sale entry
router.patch("/:id/add", async (req, res) => {
    const saleId = req.params.id;
    const newItem = req.body;

    try {
        const result = await Sale.updateOne(
            { _id: saleId },
            { $push: { items: newItem } }
        );
        res.status(200).send(result)
    } catch (error) {
        console.error(e);
        res.status(404).send("Not Found");
    }
});

// PATCH - Remove an item from a sale
router.patch("/:id/remove", async (req, res) => {
    const saleId = req.params.id;
    const itemToRemove = req.body;

    try {
        const result = await Sale.updateOne(
            { _id: saleId },
            { $pull: { items: itemToRemove } }
        );
        res.status(200).send(result);
    } catch (error) {
        console.error(e);
        res.status(404).send("Not Found");
    }
})

// DELETE a sale by ID
router.delete("/:id", async (req, res) => {
    await Sale.findByIdAndDelete(req.params.id)
    res.status(204).json({
        data: "Item has been deleted"
    })
});

export default router;