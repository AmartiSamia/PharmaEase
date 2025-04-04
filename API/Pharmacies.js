
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3003;

// Define the base URL
const baseUrl = 'https://infopoint.ma/sante/pharmacie/pharmacie?page=';

// Define the total number of pages
const totalPages = 35;

// Generate the URLs dynamically
const urls = Array.from({ length: totalPages }, (_, i) => `${baseUrl}${i + 1}`);

// Define a route to scrape data from multiple webpages
app.get('/scrape', async (req, res) => {
    try {
        const data = [];
        
        // Map URLs to an array of promises
        const promises = urls.map(async (url) => {
            // Fetch webpage content
            const response = await axios.get(url);
            const html = response.data;
            
            // Load HTML content into Cheerio
            const $ = cheerio.load(html);
            
            // Extract data using Cheerio
            $('.info-box').each((index, element) => {
                const name = $(element).find('.card-title b').text().trim();
                const address = $(element).find('.info-adress').text().trim();
                let telephone = $(element).find('.phone a').text().trim();
                const mapLink = $(element).prev().find('a').attr('href');

                if (!telephone) {
                    telephone = 'N/A';
                }

                data.push({ name, address, telephone, mapLink });
            });
        });
        
        // Execute promises concurrently
        await Promise.all(promises);
        
        // Respond with the extracted data
        res.json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//cd API
//pm2 start Pharmacies.js
