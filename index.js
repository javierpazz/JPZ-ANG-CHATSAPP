import mongoose from 'mongoose';
import { server } from './app.js';
import { IP_SERVER, PORT, DB_USER, DB_PASSWORD, DB_HOST } from './constants.js';
import { io } from './utils/index.js';

const mongoDbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/chatsbd`;
//const mongoDbLocal = 'mongodb://localhost/chatApp';
const mongoDbLocal = 'mongodb://localhost/chatsbd';

mongoose.connect(mongoDbUrl)
.then( () => {
  server.listen(PORT, () => {
    console.log("####################");
    console.log("##### API REST #####");
    console.log("####################");
    console.log(`https://${IP_SERVER}/:${PORT}/api`);
 
    //Al recibir el evento de conexión por parte del usuario:
    io.sockets.on("connection", (socket) => {
        console.log("NUEVO USUARIO CONECTADO");
 
        //Al recibir el evento de desconexión por parte del usuario:
        socket.on("disconnect", () => {
            console.log("USUARIO DESCONECTADO");
        });
 
        //Al recibir el evento suscribirse a un chat/room:
        socket.on("subscribe", (room) => {
            socket.join(room);  
        });
 
        //Al recibir el evento desuscribirse a un chat/room:
        socket.on("unsubscribe", (room) => {
            socket.leave(room);
        })
    });
  });
}
)
.catch( err => console.log(err));


// mongoose.connect(mongoDbLocal, (error) => {
//   if (error) throw error;

//   server.listen(PORT, () => {
//     console.log('######################');
//     console.log('###### API REST ######');
//     console.log('######################');
//     console.log(`http://${IP_SERVER}:${PORT}/api`);

//     io.sockets.on('connection', (socket) => {
//       console.log('NUEVO USUARIO CONECTADO');

//       socket.on('disconnect', () => {
//         console.log('USUARIO DESCONECTADO');
//       });

//       socket.on('subscribe', (room) => {
//         socket.join(room);
//       });

//       socket.on('unsubscribe', (room) => {
//         socket.leave(room);
//       });
//     });
//   });
// });
