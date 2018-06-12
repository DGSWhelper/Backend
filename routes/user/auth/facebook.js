const request = require('request')

const port = process.env.SERVER_PORT

const client_id = '475995082859135'
const client_secret = 'bae6d04aa093e9a844a34693f46ff193'
const redirect_uri = `http://localhost:${port}/user/auth/facebook`
const state = '23#hlk{2wawew}422'

const getCodeUri = 'https://www.facebook.com/v3.0/dialog/oauth?'
    + `client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`
    + `scope=public_profile,email`;
const getAccessTokenUri = 'https://graph.facebook.com/v3.0/oauth/access_token?'
    + `client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&`
const userScope = 'id,name,email,picture'
const graphApi = `https://graph.facebook.com/v3.0/me?fields=${userScope}&`

const access = (req, res, next) => {
    let code = req.query.code;
    let accessUri = getAccessTokenUri + `code=${code}`

    function getUserInfo(err, status, response) {
        let parseData = JSON.parse(response)
        let user = { }

        req.resource.name = parseData.name;
        req.resource.email = parseData.email;
        req.resource.picture = parseData.picture.data.url;

        next();
    }

    function callback(err, status, response) {
        let ob =  JSON.parse(response)

        if (ob.access_token === undefined)
            throw new Error('Access token undefined')

        console.log('access : ' + ob.access_token)

        let token = ob.access_token
        let graphApiUri = graphApi + `access_token=${token}`

        request(graphApiUri, getUserInfo)
    }

    request(accessUri, callback)
}

module.exports = access
