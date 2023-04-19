const express = require( 'express' );
const { getLocation,
    getLocationById,
    updateLocation,
    uploadLocationImage,
    deleteLocation,
    createLocation,
    searchLocation } = require( '../controllers/viTriController' );
const { authentication } = require( '../config/jwt' );
const router = express();
router.get( '/', ( req, res ) => {
    res.send( "plz" )
} );
router.get( '/phan-trang-tim-kiem', searchLocation );
router.get( '/:id', authentication, getLocationById );
router.put( '/:id', authentication, updateLocation );
router.post( '/upload-hinh-vitri', authentication, uploadLocationImage );
router.delete( '/:id', authentication, deleteLocation );
router.post( '/', authentication, createLocation );

module.exports = router