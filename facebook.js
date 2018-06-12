const router = require('express').Router();
const request = require('request');

const client_id = '475995082859135';
const client_secret = 'bae6d04aa093e9a844a34693f46ff193';
const redirect_uri = `http://localhost:${port}/access`;
const state = '23#hlk{2wawew}422';

const getCodeUri = 'https://www.facebook.com/v3.0/dialog/oauth?'
    + `client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`
    + `scope=public_profile,email`;
const getAccessTokenUri = 'https://graph.facebook.com/v3.0/oauth/access_token?'
    + `client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&`;
const userScope = 'id,name,email,picture'
const graphApi = `https://graph.facebook.com/v3.0/me?fields=${userScope}&`;

router.get('/', (req, res) => {
    let code = req.query.code;
    let accessUri = getAccessTokenUri + `code=${code}`;

    function getUserInfo(err, status, response) {
        let parseData = JSON.parse(response);
        let user = { };
        
        user.name = parseData.name;
        user.email = parseData.email;
        user.picture = parseData.picture.data.url;
    }

    function callback(err, status, response) {
        let ob =  JSON.parse(response);

        if (ob.access_token === undefined)
            throw new Error('Access token undefined');

        console.log('access : ' + ob.access_token);
        
        let token = ob.access_token;
        let graphApiUri = graphApi + `access_token=${token}`;

        request(graphApiUri, getUserInfo);
    }

    request(accessUri, callback);
});

module.exports = router;