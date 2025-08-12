import express, { json } from "express"
import cors from "cors"

const app = express();
app.use(cors());
app.use(json());

const lista = [];

app.post("/items", (req, res) =>{
    const body = req.body;
    if (!body.name ||  !body.quantity || !body.type){
        return res.sendStatus(422)
    }
    lista.map(item => {
        if (item.name === body.name){
            return res.sendStatus(409)
        }
    })
    const novoItem={
        id: lista.length +1,
        name:body.name,
        quantity:body.quantity,
        type:body.type
    }
    lista.push(novoItem)
    return res.sendStatus(201)
})



app.listen(5000, () => {
  console.log("Rodando em http://localhost:5000");
});