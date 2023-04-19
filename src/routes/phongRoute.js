const express = require( 'express' );
const { getRoomById,
    getRoomByLocation,
    getRooms,
    deleteRoom,
    updateRoom,
    createRoom,
    searchRoom } = require( '../controllers/phongController' );
const router = express.Router();
const multer = require( 'multer' );
const { authentication } = require( '../config/jwt' );

const storage = multer.diskStorage( {
    destination: ( req, file, cb ) => {
        // là nơi định nghĩa đường dẫn lưu hình
        cb( null, process.cwd() + "/public/img" );
    },
    // giúp đổi tên file đang được up lên
    filename: ( req, file, cb ) => {
        // Math.random
        // time
        const newfileName = Date.now() + "-" + file.originalname;
        cb( null, newfileName );
    }
} )
const upload = multer( { storage } )

router.get( '/:id', getRoomById );
router.get( '/', getRooms );
router.get( '/phan-trang-tim-kiem', searchRoom );
router.get( '/lay-phong-theo-vi-tri', getRoomByLocation );
router.post( '/', authentication, createRoom );
router.post( '/upload-hinh-phong/', authentication, upload.single( "data" ), createRoom );
router.put( '/', authentication, updateRoom )
router.delete( '/:id', authentication, deleteRoom );


module.exports = router