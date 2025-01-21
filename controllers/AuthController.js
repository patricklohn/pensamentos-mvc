const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req,res){
        res.render('auth/login')
    }

    static register(req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res){
        const {name, email, password, confirmpassword} = req.body;

        // password math validation
        if(password != confirmpassword){
            req.flash('message', 'As Senhas não conferem, tente novamente!')
            res.render(`auth/register`)
            return 
        }

        // check if user exists 
        const checkIfUserExists = await User.findOne({where: {email: email}})

        if(checkIfUserExists){
            req.flash('message', 'Email já esta em uso!')
            res.render(`auth/register`)
            return 
        }

        // create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            senha: hashedPassword,
        }

        try{
            const createUser = await User.create(user);

            // initialize session 
            // req.session.useruuid = createUser.dataValues.uuid;
            req.session.useruuid = createUser.uuid;

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(()=>{
                res.redirect('/')
            })

        }catch(err){
            console.log(err)
        }
    }

    static logout(req,res){
        req.session.destroy()
        res.redirect('/login')
    }

    static async loginPost(req,res){
        
        const {email, password} = req.body
        // find user

        const user = await User.findOne({where:{email: email}})
        if(!user){
            req.flash('message', 'Usuario não encontrado!')
            res.render('auth/register')
            return
        }
        
         // check if passwords match
         const passwordMatch = bcrypt.compareSync(password, user.senha)
         if(!passwordMatch){
             req.flash('message', 'Senha incorreta!')
             res.render('auth/login')
             return
        }

        req.session.useruuid = user.uuid;

            req.flash('message', `Seja bem vindo ${user.name}!`)

            req.session.save(()=>{
                res.redirect('/')
            })


    }
}