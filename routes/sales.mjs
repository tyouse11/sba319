import express from "express";
import Sale from '../models/sale.mjs'
import Review from '../models/review.mjs';
import e from "express";
import reviewsData from '../data/reviews.mjs'

const router = express.Router();

// Index - Find all sales
router.get('/', async (req, res) => {
    let foundSales = await Sale.find().limit(25)
    res.status(200).json({
      foundSales: foundSales
    });
  });

// Index - Find all reviews
router.get('/reviews', async (req, res) => {
    res.status(200).json({
      foundReviews: reviewsData
    });
  });

// Sort the reviews by rating
router.get('/reviews/sort', async (req, res) => {
    let sortedReviews = await reviewsData.sort((a,b) => a.rating - b.rating);
    res.status(200).json({
        foundReviews: sortedReviews
      });
    });

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

// Insert Reviews Data into MongoDB
router.post('/insert-reviews', async (req, res) => {
    try {
        const result = await Review.insertMany(reviewsData);
        res.status(201).json(result);
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

// POST - Create a review
router.post("/reviews", async (req, res) => {
    let newReview = req.body;

    try {
        const result = await Review.create(newReview);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// GET a single sale entry
router.get("/:id", async (req, res) => {
    try {
        let foundSale = await Sale.findById(req.params.id);
        
        if (!foundSale) {
            return res.status(404).json( { error: "Sale not Found" });
        }
        res.status(200).json({
            data: foundSale
        })
    } catch (error) {
        console.error;
        res.status(500).send("Internal Server Error")
    }
});

// GET a single review entry by ID 
router.get("/reviews/:id", async (req, res) => {
    try {
        let foundReview = await Review.findById(req.params.id);

        if (!foundReview) {
            return res.status(404).json( { error: "Review not Found" });
        }
        res.status(200).json({
            data: foundReview
        })
    } catch (error) {
        console.error;
        res.status(500).send("Internal Server Error")
    }
})

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
    });
});

// DELETE a review by ID
router.delete("/review/:id", async (req, res) => {
    await Review.findByIdAndDelete(req.params.id)
    res.status(204).json({
        data: "Review has been deleted"
    });
});

export default router;