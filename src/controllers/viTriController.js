const { Sequelize } = require( 'sequelize' );
const initModels = require( '../models/init-models' );
const sequelize = require( '../models/index' );
const model = initModels( sequelize );
const Op = Sequelize.Op;
require( 'dotenv' ).config();

const { failCode, successCode, errorCode } = require( '../config/response' );

const getLocation = async ( req, res ) => {
    try {
        let locationList = await model.vitriviewmodel.findAll();

        successCode( res, locationList, 'Lấy danh sách vị trí thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const createLocation = ( req, res ) => {
    try {
        let {
            tenViTri,
            tinhThanh,
            quocGia,
            hinhAnh } = req.body;

        let location = model.vitriviewmodel.create( {
            tenViTri,
            tinhThanh,
            quocGia,
            hinhAnh
        } )
        successCode( res, location, "Tạo vị trí mới thành công" );
    } catch ( err ) {
        errorCode( res, "Lỗi BE" );
    }
}

const searchLocation = async ( req, res ) => {
    const { pageIndex, pageSize, keyword } = req.query;
    const defaultPageIndex = 0;
    const defaultPageSize = 10;

    // Parse the values to make sure they are integers
    const parsedPageIndex = parseInt( pageIndex || defaultPageIndex );
    const parsedPageSize = parseInt( pageSize || defaultPageSize );

    try {
        let locationList = await model.vitriviewmodel.findAndCountAll( {
            where: {
                tenViTri: {
                    [ Op.like ]: `%${ keyword }%`
                }
            },
            offset: parsedPageIndex * parsedPageSize,
            limit: parsedPageSize
        } );

        successCode( res, locationList, 'Lấy danh sách vị trí thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}
const getLocationById = async ( req, res ) => {
    try {
        let id = req.params.id;
        let location = await model.vitriviewmodel.findByPk( id );

        successCode( res, location, 'Lấy vị trí thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}
const updateLocation = async ( req, res ) => {
    try {
        let id = req.params.id;
        let {
            tenViTri,
            tinhThanh,
            quocGia,
            hinhAnh
        } = req.body;
        if ( id ) {
            let location = await model.vitriviewmodel.udpate( {
                tenViTri,
                tinhThanh,
                quocGia,
                hinhAnh
            }, {
                where: {
                    id
                }
            } );
            successCode( res, location, 'Cập nhật vị trí thành công' );
        }
        errorCode( res, "Không có id hình ảnh" )
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}
const deleteLocation = async ( req, res ) => {
    try {
        let id = req.params.id;
        let location = await model.vitriviewmodel.destroy( {
            where: id
        } );

        successCode( res, location, 'Xóa vị trí thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}
const uploadLocationImage = async ( req, res ) => {
    try {
        const file = req.file;
        const { maViTri } = req.query;

        let hinhAnh = file.filename;
        let modelLocation = await model.vitriviewmodel.findOne(
            {
                where: {
                    id: maViTri
                }
            } );

        modelLocation.hinhAnh = hinhAnh;
        modelLocation.save( { fields: [ 'hinhAnh' ] } );

        successCode( res, modelLocation, 'Thêm hình thành công' );
    } catch ( err ) {
        console.log( err );
        errorCode( res, "Lỗi BE" );
    }
}

module.exports = {
    getLocation,
    getLocationById,
    updateLocation,
    uploadLocationImage,
    deleteLocation,
    createLocation,
    searchLocation
}