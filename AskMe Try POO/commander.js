const db = require('./db')
const commander = require('commander')
const inquirer = require('inquirer')
const fs = require('fs')
const async = require('async')

class game
{
    constructor()
    {
        this.db = db
        this.commander = commander
        this.inquirer = inquirer
        this.fs = fs
        this.async = async
    }
}

module.exports = game
