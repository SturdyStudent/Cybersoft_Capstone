const express = require( 'express' );
const { getBookedRooms,
    getBookedRoomByUserId,
    getBookedRoomById,
    updateBookedRoom,
    bookRoom,
    deleteBookedRoom } = require( '../controllers/datPhongController' );
const router = express();

router.post( '/', getBookedRooms );
router.get( '/lay-theo-nguoi-dung/:id', getBookedRoomByUserId );
router.get( '/:id', getBookedRoomById );
router.put( '/:id', updateBookedRoom );
router.post( '/', bookRoom );
router.delete( '/:id', deleteBookedRoom );


module.exports = router