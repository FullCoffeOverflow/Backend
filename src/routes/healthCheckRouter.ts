import express from "express";

const router = express.Router()

router.get('/', (request, response) => {
    response.send("Don't Panic! All right!")
})

export default router;