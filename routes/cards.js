const express = require(`express`) 
const router = express.Router()

const data = require(`../data/flashCardsData.json`).data
//const {data} = require(`../data/flashCardsData.json`) shorthand

const cards = data.cards

router.get(`/`,(req,res)=>{
    let totalCard = cards.length
    let randomId = Math.floor(Math.random()* totalCard) 

    res.redirect(`/cards/${randomId}?side=soal`)
})

router.get(`/:id`,(req, res)=>{
    //console.log("oyoy")
    // res.locals.variable = "aku adalah aku"
    // res.locals.hint = "kamu adalah kamu"
    // console.dir(data)

    const {id} = req.params
    const {side} = req.query
    const text = cards[id][side]
    const {hint} = cards[id]
    let templateData = {id, text, hint}

    if (side=="jawaban"){
         templateData = {id, text}
         templateData.sidenya="soal"
         templateData.SideToDisplay="Lihat Soal"
    }
    else if(side == `soal`){
        templateData.sidenya="jawaban"
        templateData.SideToDisplay="lihat jawaban"
    }
    else if(!side){
        res.redirect(`/cards/${id}?side=soal`)
    }
    

    res.locals=templateData
    console.log(res.locals)
    res.render("cards"/*,{variable:"aku siapa?"}*/) //locals
})

module.exports = router