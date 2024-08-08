import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'

import 'dotenv/config'

const prisma = new PrismaClient()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.post('/api', async (req, res) => {
	const { email, name } = req.body

	await new Promise(resolve => setTimeout(resolve, 3000)) // Simulating of waiting

	const errors = []

	if (!email) errors.push('Email is required field')
	if (!name) errors.push('Name is required field')
	if (errors.length) return res.status(400).json({ errors })

	try {
		const createdRow = await prisma.waitList.create({
			data: {
				email,
				name,
			},
		})
		res.status(201).json(createdRow)
	} catch (error) {
		res.status(400).json({ error })
	}
})

const server = app.listen(PORT, () => {
	console.log(`Listening on PORT ${PORT}`)
})
