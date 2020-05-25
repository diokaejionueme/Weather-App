const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>{
	res.render('index', {
		title: 'Weather app', 
		name: 'Dioka Ejionueme'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Dioka Ejionueme'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help!',
		helpText: 'How May I Help You',
		name: 'Dioka Ejionueme'
	})
})

app.get('/weather', (req, res) => {
	if(!req.query.address){
		return res.send({
			error: 'You must provide an Address'
		})
	} 

	geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
		if(error){
			return res.send({error})
		}

		forecast(latitude, longitude, (error, forecastData)=> {
			if(error){
				return res.send({error})
			}

			res.send({
				forecast: forecastData,
				location, 
				address: req.query.address
			})
		})
	})



	
	// res.send({
	// 	forecast: 'It is currently 37 degree out',
	// 	location: 'Lagos, Nigeria',
	// 	address: req.query.address
	// })
})

app.get('/products', (req, res) => {

	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}
	console.log(req.query.search)
	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name:  'Dioka Ejionueme',
		errorMessage: 'Article not found'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name:  'Dioka Ejionueme',
		errorMessage: 'Page not found'
	})

})

app.listen(port, () => {
	console.log('Server is up on port ' + port)
})
