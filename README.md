# Public Protection API Alpha

This repository is a proof of concept for a modern API that can expose data from the legacy PPUD database. Developed as part of the MoJ PPUD replacement alpha by [dxw](https://dxw.com).

## Requirements

  * Node.js 12.13.0
  * Microsoft SQL Server
  * Docker

  Run `script/bootstrap` to install all requirements.

## Usage

  Run `script/server`

  * MS SQL Server will be run in Docker; data from `data/PPUD.sql` will automatically be used to seed the database
  * The API server will be accessible at http://localhost:3000
  * The API documentation will be visible at http://localhost:3000/api-docs

## Development

This repository follows the [scripts to rule them all](https://github.blog/2015-06-30-scripts-to-rule-them-all/) pattern. The `script` directory contains scripts for all common development tasks, such as `script/test`.
