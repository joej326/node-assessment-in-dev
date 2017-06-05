const userData = require('./userData.json');

module.exports = {

    getUsers: (req, res, next) => {

        if (!req.query.favorites && !req.query.age && !req.query.lastname && !req.query.email) {
            res.status(200).json(userData);
        }

        if (req.query.favorites) {
            let userFavoritesArray = [];

            for (let i = 0; i < userData.length; i++) {

                if (userData[i].favorites.includes(req.query.favorites)) {
                    //console.log('this' + userData[19].favorites);
                    userFavoritesArray.push(userData[i]);


                }
            }
            return res.status(200).json(userFavoritesArray);
        }

        if (req.query.age) {
            let userAgeArray = [];

            for (let i = 0; i < userData.length; i++) {
                if (userData[i].age < req.query.age) {
                    userAgeArray.push(userData[i]);
                }
            }
            return res.status(200).send(userAgeArray);
        }

        if (req.query.lastname) {

            let userLastnameArray = [];

            for (let i = 0; i < userData.length; i++) {
                if (req.query.lastname == userData[i].last_name) {
                    userLastnameArray.push(userData[i]);
                }
            }
            return res.status(200).send(userLastnameArray);
        }

        if (req.query.email) {
            let userEmailArray = [];

            for (let i = 0; i < userData.length; i++) {
                if (req.query.email == userData[i].email) {
                    userEmailArray.push(userData[i]);

                }
            }
            if (userEmailArray.length = 1) {
                return res.status(200).json(userEmailArray[0]);
            }
            return res.status(200).json(userEmailArray);

        }




    },

    getUserId: (req, res, next) => {
        if (req.params.id) {
            let found = 'no';
            for (let i = 0; i < userData.length; i++) {
                if (req.params.id == userData[i].id) {
                    let found = 'yes';
                    console.log(userData[i]);
                    return res.status(200).json(userData[i]);
                }
            }
            if (found == 'no') {
                res.status(404).json(null);
            }


        }


        res.status(500).json('ooo tough luck');
    },

    getUserAdmins: (req, res, next) => {
        let adminArray = [];
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].type == 'admin') {
                console.log('admin was found');
                adminArray.push(userData[i]);
            }
        }
        return res.status(200).json(adminArray);
    },

    getUserNotAdmins: (req, res, next) => {
        let notAdminArray = [];
        console.log('yesss');
        for (let i = 0; i < userData.length; i++) {
            if (userData[i].type != 'admin') {
                console.log('oh neeeeeiinn');
                notAdminArray.push(userData[i]);
            }
        }
        return res.status(200).json(notAdminArray);
    },

    getUserType: (req, res, next) => {
        let userTypeArray = [];

        if (req.params.userType) {

            for (let i = 0; i < userData.length; i++) {
                if (req.params.userType == userData[i].type) {
                    userTypeArray.push(userData[i]);
                }
            }
            return res.status(200).json(userTypeArray);
        } else {
            res.status(500).send('sorry, lol')
        }
    },

    changeUserId: (req, res, next) => {
        for (let i = 0; i < userData.length; i++) {
            if (req.params.id == userData[i].id) {
                console.log(req.body);
                userData[i] = req.body;
                return res.status(200).json(userData);
            }
        }


    },


    addUser: (req, res, next) => {
        req.body.id = userData.length + 1;
        userData.push(req.body);

        return res.status(200).json(userData);
    },


    deleteUser: (req, res, next) => {
        for (let i = 0; i < userData.length; i++) {
            if (req.params.id == userData[i].id) {
                userData.splice(i, 1);
            }
        }
        return res.status(200).json(userData);
    }


};
