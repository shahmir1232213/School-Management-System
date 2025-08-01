import express from 'express'
import {register, fetch} from '../controllers/subjectController'

const subjectRouter = express.Router()

subjectRouter.post('/register', register)
subjectRouter.get('/fetch', fetch)

export default subjectRouter
