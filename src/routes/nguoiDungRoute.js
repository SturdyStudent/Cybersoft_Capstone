const express = require( 'express' );
const { getAllUser,
    createUser,
    updateUser,
    findUser,
    findUserByName,
    uploadUserAvatar,
    deleteUser,
    getUserById } = require( '../controllers/nguoiDungController' );
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

router.post( '/', createUser );
router.get( '/', getAllUser );
router.put( '/:id', updateUser );
router.get( '/:id', getUserById );
router.delete( '/:id', deleteUser );
router.get( '/phan-trang-tim-kiem', findUser );
router.post( '/upload-avatar', authentication, upload.single( "data" ), uploadUserAvatar );
router.get( '/search/:TenNguoiDung', findUserByName );

module.exports = router