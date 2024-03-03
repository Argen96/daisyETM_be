import express from 'express'
import cors from 'cors'
import { errorHandler } from './src/error/errorHandler.js';

const port = 80
const app = express()
app.use(cors())
app.use(express.json())


// app.post('/api/sign-up', async (req, res) => {
//       res.status(200)
//       res.json('')
//      })

// app.post('/api/log-in', async (req, res) => {
//       res.status(200)
//       res.json('')
//      })

app.use(errorHandler)

app.listen(port, ()=>console.log(`Port is available in port ${port}`))