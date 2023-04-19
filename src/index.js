const express = require( 'express' );
const { router } = require( './routes' );
const app = express();

app.listen( '3000', () => {
    console.log( 'server on port 3000' );
} )

app.use( '/api', router );