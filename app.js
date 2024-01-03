const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/api", (req,res)=>{
    res.json({
        mensaje: "Nodejs and jwt"
    });
});

app.post("/api/login", (req,res)=>{
    const user = {
        id:1,
        nombre : "Kevin",
        email: "kevin@gmail.com",
        contraseña: "2415814"   
    }
    console.log(req.body)
    const body = req.body
    if(user.email == body.email && user.contraseña == body.password){
        console.log('entro');
        jwt.sign({user},'secretkey',{expiresIn:'3600'},(err,token) =>{
            res.json({
                token
            });
        });
    }else
    res.json({
        res:"Usuario no Registrado"
    });
   
    
});
app.get("/api/libros",(req,res)=>{
    const libros = [
        {
            "autor": "Jennifer Niven",
          "descripcion": "Esta es la historia de una chica que aprende a vivir de un chico que pretende morir",
          "genero": "Novela, Ficción, Romantica, Juvenil",
          "id": 1,
          "titulo": "Violet y Finchh",
          "urlI": "https://www.librerialuces.com/es/imagenes/9788408/978840826156.JPG"
        },
        {
            "autor": "Ariana Godoy",
            "descripcion": "Nada es tan fácil y simple en la vida de alguien como yo. ¿Qué se siente al vivir con tres chicos ?",
            "genero": "Relatos románticos/juvenil",
            "id": 2,
            "titulo": "A traves de ti",
            "urlI": "https://www.librerialuces.com/es/imagenes/9788418/978841848350.JPG"
          },
          {
            "autor": "Sthepen Chbosky",
            "descripcion": "En la novela se detalla el estilo de pensamiento poco convencional mientras navega entre los mundos de la adolescencia y la adultez",
            "genero": "Romance/Drama",
            "id": 3,
            "titulo": "Ventajas de ser invisible",
            "urlI": "https://www.librerialuces.com/es/imagenes/9788420/978842040354.JPG"
          },
          {
            "autor": "Jhon Green",
            "descripcion": "Hazel tiene dieciséis años, está enferma de cáncer desde pequeña y sobrevive gracias a un pequeño milagro médico y a la bombona de oxígeno que la acompaña todo el tiempo.",
            "genero": "infantil/juvenil",
            "id": 4,
            "titulo": "Bajo la misma Estrella",
            "urlI": "https://www.librerialuces.com/es/imagenes/9788415/978841559401.JPG"
          },
          {
            "autor": "Maria Martinez",
            "descripcion": "volver a creer en el amor ¿Qué ocurre cuando todos tus planes se desvanecen? Sin embargo, una triste pérdida hará que su plan perfecto, aquello que creía querer más que nada, se transforme de nuevo en confusión, dudas e inseguridades",
            "genero": "Relatos románticos",
            "id": 5,
            "titulo": "Tu y otros desastres naturales",
            "urlI": "https://www.librerialuces.com/es/imagenes/9788408/978840821481.JPG"
          },
          {
            "autor": "Jhon Green",
            "descripcion": "amor incompresible",
            "genero": "Novela Romantica",
            "id": 6,
            "titulo": "Ciudades de Papel",
            "urlI": "https://www.librerialuces.com/es/imagenes/9788415/978841559428.JPG"
          },
          {
            "autor": "E.L James",
            "descripcion": "Joven empresario Christian Grey, queda impresionada al encontrarse ante un hombre atractivo, seductor y también muy intimidante.",
            "genero": "Romantica y Erotica",
            "id": 8,
            "titulo": "Cincuenta Sombras de Grey",
            "urlI": "https://imagessl9.casadellibro.com/a/l/t7/39/9788425348839.jpg"
          },
          {
            "autor": " Rainbow Rowell",
            "descripcion": "Una historia de amor entre dos outsiders lo bastante inteligentes como para saber que el primer amor nunca es para siempre, pero lo suficientemente valientes como para intentarlo.",
            "genero": "Novela, Ficción, Novela rosa",
            "id": 9,
            "titulo": "Eleanor & Park",
            "urlI": "https://www.libreriasinopsis.com/imagenes/9788420/978842041570.JPG"
          }
    ]
    console.log(libros);
    res.json(libros);
    
});
app.post("/api/posts", verifyToken,(req,res)=>{

    jwt.verify(req.token,'secretkey', (error,authData)=>{
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje:"Post fue creado",
                authData
            });
        }
    });
});
// Authorization: Bearer <token>
function verifyToken(req,res,next){
    const bearerHeader= req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
            const bearerToken = bearerHeader.split(" ")[1];
            req.token = bearerToken;
            next();
    }else{
        res.sendStatus(403); //acceso porhibido
    }
}
app.listen(4200,()=>{
    console.log("nodejs app running....")
});