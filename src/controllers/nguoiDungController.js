const initModels = require( '../models/init-models' );
const sequelize = require( '../models/index' );
const model = initModels( sequelize );
const { Sequelize } = require( 'sequelize' );
require( 'dotenv' ).config();
const Op = Sequelize.Op;

const { failCode, successCode, errorCode } = require( '../config/response' );

const getAllUser = async ( req, res ) => {
    try {
        let userInfo = await model.thongtinnguoidung.findAll();

        successCode( res, userInfo, 'Lấy danh sách người dùng thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const createUser = ( req, res ) => {
    try {
        let { hoTen,
            email,
            matKhau,
            soDienThoai,
            sinhNhat,
            gioiTinh,
            vaiTro,
            hinhAnh } = req.body;

        let modelUser = model.nguoi_dung.create( {
            hoTen,
            email,
            matKhau,
            soDienThoai,
            sinhNhat,
            gioiTinh,
            vaiTro,
            hinhAnh
        } )
        successCode( res, modelUser, "Tạo người dùng thành công" );
    } catch ( err ) {
        errorCode( res, "Lỗi BE" );
    }
}

const deleteUser = ( req, res ) => {
    try {
        let id = req.body.userId;

        let modelUser = model.thongtinnguoidung.destroy( {
            id
        } )
        successCode( res, modelUser, "Xóa người dùng thành công" );
    } catch ( err ) {
        errorCode( res, "Lỗi BE" );
    }
}

const findUser = async ( req, res ) => {
    const { pageIndex, pageSize, keyword } = req.query;
    const defaultPageIndex = 0;
    const defaultPageSize = 10;

    // Parse the values to make sure they are integers
    const parsedPageIndex = parseInt( pageIndex || defaultPageIndex );
    const parsedPageSize = parseInt( pageSize || defaultPageSize );

    try {
        let userList = await model.thongtinnguoidung.findAndCountAll( {
            where: {
                hoTen: {
                    [ Op.like ]: `%${ keyword }%`
                }
            },
            offset: parsedPageIndex * parsedPageSize,
            limit: parsedPageSize
        } );

        successCode( res, userList, 'Lấy danh sách vị trí thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const getUserById = async ( req, res ) => {
    try {
        let id = req.body.userId;

        let userInfo = await model.thongtinnguoidung.findAll( {
            where: {
                id
            }
        } )
        let detail = userInfo[ 0 ].dataValues;
        if ( detail ) {
            successCode( res, { ...( detail ), mat_khau: '' }, 'Trả về thông tin người dùng thành công' );
        } else {
            successCode( res, { ...( detail ), mat_khau: '' }, 'Không tìm thấy người dùng' );
        }
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const updateUser = async ( req, res ) => {
    try {
        const {
            hoTen,
            email,
            matKhau,
            soDienThoai,
            sinhNhat,
            gioiTinh,
            vaiTro,
            hinhAnh
        } = req.body;
        const id = req.body.userId;
        if ( id ) {
            let modelUser = await model.thongtinnguoidung.update( {
                email,
                matKhau: bcrypt.hashSync( matKhau, Number( process.env.HASH_ROUND ) ),
                hoTen,
                soDienThoai,
                sinhNhat,
                gioiTinh,
                vaiTro,
                hinhAnh
            }, {
                where: {
                    id
                }
            } )
            successCode( res, modelUser, 'Cập nhật thông tin người dùng thành công' );
        } else {
            failCode( res, null, 'Không có id người dùng' );
        }

    } catch ( err ) {
        errorCode( res, 'Lỗi BE' )
    }
}

const findUserByName = async ( req, res ) => {
    try {
        let hoTen = req.params.TenNguoiDung;

        let userInfo = await model.thongtinnguoidung.findAll( {
            where: {
                hoTen: {
                    [ Op.like ]: `%${ hoTen }%`
                }
            }
        } )
        if ( detail ) {
            successCode( res, userInfo, 'Trả về thông tin người dùng thành công' );
        } else {
            successCode( res, '', 'Không tìm thấy người dùng' );
        }
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const uploadUserAvatar = async ( req, res ) => {
    try {
        const file = req.file;
        const id = req.body.userId;

        let hinhAnh = file.filename;
        let modelImage = await model.thongtinnguoidung.findOne(
            {
                where: {
                    id
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



module.exports = {
    getAllUser,
    createUser,
    updateUser,
    findUser,
    findUserByName,
    uploadUserAvatar,
    deleteUser,
    getUserById
}