const express = require('express');
const bodyParser = require('body-parser');
const usersCtrl = require('./usersCtrl.js');

const app = express();

app.use(bodyParser.json());


app.get('/api/users',usersCtrl.getUsers);
app.get('/api/users/:id', usersCtrl.getUserId);
app.get('/api/admins', usersCtrl.getUserAdmins);
app.get('/api/nonadmins', usersCtrl.getUserNotAdmins);
app.get('/api/user_type/:userType', usersCtrl.getUserType);
app.put('/api/users/:id', usersCtrl.changeUserId);
app.post('/api/users/', usersCtrl.addUser);
app.delete('/api/users/:id', usersCtrl.deleteUser);



app.listen(3000,()=>{
  console.log('show time, folks.');
})
