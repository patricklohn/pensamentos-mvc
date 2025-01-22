const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController {
    static async showToughts(req, res){
        res.render('toughts/home')
    }

    static async dashboard(req,res){

        const userUuid = req.session.useruuid
        const user = await User.findOne({where:{uuid: userUuid,}, include: Tought, plain:true})

        if(!user){
            res.redirect('/login')
        }

        const toughts = user.Toughts.map((result)=> result.dataValues)

        res.render('toughts/dashboard', {toughts})
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