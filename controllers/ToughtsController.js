const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController {
    static async showToughts(req, res){
        res.render('toughts/home')
    }

    static async dashboard(req,res){
        res.render('toughts/dashboard')
    }

    static createTought(req,res){
        res.render('toughts/create')
    }

    static async createToughtSave(req,res){

        const tought = {
            title: req.body.title,
            UserUuid: req.session.useruuid,
        }

        try{
            await Tought.create(tought)

            req.flash('message', 'pensamento criado com sucesso!')
            
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })    
        }catch(err){
            console.log(err)
        }
    }
}