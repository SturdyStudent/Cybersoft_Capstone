const express = require( 'express' );
const { getAllComments,
    getCommentsByRoom,
    updateComment,
    createComment,
    deleteComment, } = require( '../controllers/binhLuanController' );
const { authentication } = require( '../config/jwt' );
const router = express();

router.post( '/', getAllComments );
router.get( '/lay-binh-luan-theo-phong/:MaPhong', getCommentsByRoom );
router.put( '/:id', updateComment );
router.post( '/', authentication, createComment );
router.delete( '/:id', deleteComment );


module.exports = router