const Tought = require('../models/Tought')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class ToughtController {
    static async showToughts(req, res){

        let search= '';

        if(req.query.search){
            search = req.query.search
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: {[Op.like]:`%${search}%`},
            }
        })
        const toughts = toughtsData.map((result)=> result.get({plain: true}))

        res.render('toughts/home', {toughts , search})
    }

    static async dashboard(req,res){

        const userUuid = req.session.useruuid
        const user = await User.findOne({where:{uuid: userUuid,}, include: Tought, plain:true})

        if(!user){
            res.redirect('/login')
        }

        const toughts = user.Toughts.map((result)=> result.dataValues)

        let emptyToughts = false 

        if(toughts.length === 0){
            emptyToughts = true
        }

        res.render('toughts/dashboard', {toughts, emptyToughts})
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

    static async removeTought(req, res){
        const id = req.body.id
        const UserUuid = req.session.useruuid

        try{
            await Tought.destroy({where:{id: id, UserUuid: UserUuid}})  
            
            req.flash('message', 'pensamento excluido com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })    
            
        }catch(err){
            console.log(err)
        }

    }

    static async updateTought(req,res){
        const id = req.params.id; 

        const tought = await Tought.findOne({where: {id:id}, raw:true})
        console.log(tought)

        res.render('toughts/edit', {tought})
    }

    static async updateToughtSave(req,res){

        const id = req.body.id

        const tought = {
            title: req.body.title
        }

        try{
            await Tought.update(tought, {where: {id:id}})

            req.flash('message', 'pensamento atualizado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })  
        }catch(err){
            console.log(err)
        }  

    }
}

