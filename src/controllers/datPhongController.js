const initModels = require( '../models/init-models' );
const sequelize = require( '../models/index' );
const model = initModels( sequelize );
require( 'dotenv' ).config();

const { failCode, successCode, errorCode } = require( '../config/response' );

const getBookedRooms = async ( req, res ) => {
    try {
        let roomInfos = await model.datphong.findAll();

        successCode( res, roomInfos, 'Lấy danh sách phòng thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const bookRoom = async ( req, res ) => {
    try {
        const {
            ngayDen,
            ngayDi,
            soLuongKhach,
            maNguoiDung
        } = req.body;
        let roomInfo = await model.datphong.create(
            {
                ngayDen,
                ngayDi,
                soLuongKhach,
                maNguoiDung
            }
        );

        successCode( res, roomInfo, 'Đặt phòng thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const getBookedRoomById = async ( req, res ) => {
    try {
        const id = req.params.id;
        let roomInfo = await model.datphong.findOne(
            {
                where: {
                    id
                }
            }
        );

        successCode( res, roomInfo, 'Tìm phòng thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const updateBookedRoom = async ( req, res ) => {
    try {
        const id = req.params.id;
        const {
            ngayDen,
            ngayDi,
            soLuongKhach,
            maNguoiDung
        } = req.body;
        let roomInfo = await model.datphong.update(
            {
                ngayDen,
                ngayDi,
                soLuongKhach,
                maNguoiDung
            }, {
            where: {
                id
            }
        }
        );

        successCode( res, roomInfo, 'Cập nhật phòng thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const deleteBookedRoom = async ( req, res ) => {
    try {
        const id = req.params.id;

        let roomInfo = await model.datphong.destroy(
            {
                where: {
                    id
                }
            }
        );

        successCode( res, roomInfo, 'Hủy đặt phòng thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const getBookedRoomByUserId = async ( req, res ) => {
    try {
        const maNguoiDung = req.params.maNguoiDung;

        let roomInfo = await model.datphong.findAll(
            {
                where: {
                    maNguoiDung
                }
            }
        );

        successCode( res, roomInfo, 'Lấy phòng theo người dùng thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}



module.exports = {
    getBookedRooms,
    getBookedRoomByUserId,
    getBookedRoomById,
    updateBookedRoom,
    bookRoom,
    deleteBookedRoom
}