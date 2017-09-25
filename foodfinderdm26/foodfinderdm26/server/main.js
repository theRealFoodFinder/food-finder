require('dotenv').config()

const express = require('express')
	//, session = require('express-session')
	, bodyParser = require('body-parser')
	, cors = require('cors')
	, app = express()

app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.SERVER_PORT, _=>{console.log('(I)...(I) '+process.env.SERVER_PORT)})