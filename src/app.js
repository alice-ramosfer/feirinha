import express, { json } from "express"
import cors from "cors"
import status from "http-status";

const app = express();
app.use(cors());
app.use(json());

const lista = [];

app.post("/items", (req, res) =>{
    const body = req.body;
    if (!body.name ||  !body.quantity || !body.type){
        return res.sendStatus(status.UNPROCESSABLE_ENTITY)
    }
    lista.map(item => {
        if (item.name.toLowerCase() === body.name.toLowerCase()){
            return res.sendStatus(status.CONFLICT)
        }
    })
    const novoItem={
        id: lista.length +1,
        name:body.name,
        quantity:body.quantity,
        type:body.type
    }
    lista.push(novoItem)
    return res.sendStatus(status.CREATED)
})

app.get("/items", (req, res)=>{
    const {tipo} = req.query;
    console.log(req.query)
    if (tipo){
        const itemsFiltados = lista.filter(item =>{
            return item.type.toLowerCase().includes(tipo.toLowerCase())
        })
        return res.send(itemsFiltados)   
    }
    return res.send(lista)
})

app.get("/items/:id",(req, res)=>{
    const {id} = req.params;
    if (id<0  || !Number.isInteger(Number(id))){
        return res.sendStatus(status.BAD_REQUEST);
    }
    const itemFiltradoID = lista.find(item => id == item.id);
    if (!itemFiltradoID){
        return res.sendStatus(status.NOT_FOUND);
    }
    return res.send(itemFiltradoID);
})


app.listen(5000, () => {
  console.log("Rodando em http://localhost:5000");
});