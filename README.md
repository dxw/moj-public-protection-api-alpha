# Public Protection API Alpha

This repository is a proof of concept for a modern API that can expose data from the legacy PPUD database. Developed as part of the MoJ PPUD replacement alpha by [dxw](https://dxw.com).

## Requirements

  * Node.js 12.13.0
  * Microsoft SQL Server
 
## Usage

  1. Run MS SQL Server in Docker, with `docker-compose up`. Data from `data/PPUD.sql` will automatically be used to seed the database
  1. Start the API server with `npm start`
  
  The API server will be accessible at http://localhost:3000, and the API documentation will be visible at http://localhost:3000/api-docs

