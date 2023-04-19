const initModels = require( '../models/init-models' );
const sequelize = require( '../models/index' );
const model = initModels( sequelize );
const { Sequelize } = require( 'sequelize' );
require( 'dotenv' ).config();
const Op = Sequelize.Op;

const { failCode, successCode, errorCode } = require( '../config/response' );

const getRooms = async ( req, res ) => {
    try {
        let roomInfo = await model.phong.findAll();

        successCode( res, roomInfo, 'Không tìm thấy người dùng' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}
const uploadRoomAvatar = async ( req, res ) => {
    try {
        const file = req.file;
        const { maPhong } = req.query;

        let hinhAnh = file.filename;
        let modelImage = await model.phong.findOne(
            {
                where: {
                    id: maPhong
                }
            } );

        modelImage.hinhAnh = hinhAnh;
        modelImage.save( { fields: [ 'hinhAnh' ] } );

        successCode( res, modelImage, 'Thêm hình thành công' );
    } catch ( err ) {
        console.log( err );
        errorCode( res, "Lỗi BE" );
    }
}
const createRoom = async ( req, res ) => {
    try {
        const {
            tenPhong,
            khach,
            phongNgu,
            giuong,
            phongTam,
            moTa,
            giaTien,
            mayGiat,
            banLa,
            tivi,
            dieuHoa,
            wifi,
            bep,
            doXe,
            hoBoi,
            banUi,
            maViTri
        } = req.body;
        let roomInfo = await model.phong.create(
            {
                tenPhong,
                khach,
                phongNgu,
                giuong,
                phongTam,
                moTa,
                giaTien,
                mayGiat,
                banLa,
                tivi,
                dieuHoa,
                wifi,
                bep,
                doXe,
                hoBoi,
                banUi,
                maViTri
            }
        );

        successCode( res, roomInfo, 'Đặt phòng thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const getRoomById = async ( req, res ) => {
    try {
        const id = req.params.id;
        let roomInfo = await model.phong.findOne(
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

const updateRoom = async ( req, res ) => {
    try {
        const id = req.params.id;
        const {
            tenPhong,
            khach,
            phongNgu,
            giuong,
            phongTam,
            moTa,
            giaTien,
            mayGiat,
            banLa,
            tivi,
            dieuHoa,
            wifi,
            bep,
            doXe,
            hoBoi,
            banUi,
            maViTri
        } = req.body;
        let roomInfo = await model.phong.update(
            {
                tenPhong,
                khach,
                phongNgu,
                giuong,
                phongTam,
                moTa,
                giaTien,
                mayGiat,
                banLa,
                tivi,
                dieuHoa,
                wifi,
                bep,
                doXe,
                hoBoi,
                banUi,
                maViTri
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

const deleteRoom = async ( req, res ) => {
    try {
        const id = req.params.id;

        let roomInfo = await model.phong.destroy(
            {
                where: {
                    id
                }
            }
        );

        successCode( res, roomInfo, 'Xóa phòng thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const getRoomByLocation = async ( req, res ) => {
    try {
        const maViTri = req.query.maViTri;

        let roomInfo = await model.phong.findAll(
            {
                where: {
                    maViTri
                }
            }
        );

        successCode( res, roomInfo, 'Lấy phòng theo vị trí thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const searchRoom = async ( req, res ) => {
    try {
        const { pageIndex, pageCount, keyword } = req.query;
        const defaultPageIndex = 0;
        const defaultPageSize = 10;

        // Parse the values to make sure they are integers
        const parsedPageIndex = parseInt( pageIndex || defaultPageIndex );
        const parsedPageSize = parseInt( pageSize || defaultPageSize );

        let roomInfo = await model.phong.findAndCountAll(
            {
                where: {
                    tenPhong: {
                        [ Op.like ]: `%${ keyword }%`
                    }
                },
                offset: parsedPageIndex * parsedPageSize,
                limit: parsedPageIndex
            },
        );

        successCode( res, roomInfo, 'Lấy phòng theo vị trí thành công' );
    } catch ( e ) {
        console.log( e );
    }
}

module.exports = {
    getRoomById,
    getRoomByLocation,
    getRooms,
    deleteRoom,
    updateRoom,
    createRoom,
    searchRoom,
    searchRoom,
    uploadRoomAvatar
}