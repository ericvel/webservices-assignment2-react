global.config = require('./config');

//JWT verification
module.exports =
{

Verification: function (header_value)
{
    // Get JWT from global variable
    const loginToken = config.token;
    // Get JWT from request header
    
    if (loginToken == header_value) 
    {
        //res.status(200);
        //res.send('access granted');
        // console.log('Access Granted');
        return true;
    }//if
    else
    {
       //res.status(403);
      //res.send('forbidden');
      //console.log('Access Denied');
      return false;
    }//else
}
}