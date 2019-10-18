import express from "express";

const router = express.Router()

router.get('/', (request, response) => {
    response.status(200).send("Don't Panic! All right!")
})

export default router;