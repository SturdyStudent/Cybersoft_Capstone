const initModels = require( '../models/init-models' );
const sequelize = require( '../models/index' );
const model = initModels( sequelize );
require( 'dotenv' ).config();

const { failCode, successCode, errorCode } = require( '../config/response' );

const getAllComments = async ( req, res ) => {
    try {
        let commentList = await model.binhluan.findAll();

        successCode( res, commentList, 'Lấy danh sách bình luận thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const createComment = async ( req, res ) => {
    try {
        const {
            maPhong,
            maNguoiBinhLuan,
            ngayBinhLuan,
            noiDung,
            saoBinhLuan
        } = req.body;
        let commentCreated = await model.binhluan.create( {
            maPhong,
            maNguoiBinhLuan,
            ngayBinhLuan,
            noiDung,
            saoBinhLuan
        } );

        successCode( res, commentCreated, 'Tạo bình luận thành công' );
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const updateComment = async ( req, res ) => {
    try {
        const id = req.params.id;
        const {
            maPhong,
            maNguoiBinhLuan,
            noiDung,
            ngayBinhLuan,
            saoBinhLuan
        } = req.body;
        if ( id ) {
            let commentCreated = await model.binhluan.update( {
                maPhong,
                maNguoiBinhLuan,
                ngayBinhLuan,
                noiDung,
                saoBinhLuan
            }, {
                id
            } );
            successCode( res, commentCreated, 'Tạo bình luận thành công' );
        } else {
            errorCode( res, "Không có id truyền vào" );
        }
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const deleteComment = async ( req, res ) => {
    try {
        const id = req.params.id;
        if ( id ) {
            let commentDestroyed = await model.binhluan.destroy( {
                where: {
                    id
                }
            } );
            successCode( res, commentDestroyed, 'Xóa bình luận thành công' );
        } else {
            errorCode( res, "Không có id truyền vào" );
        }
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const getCommentsByRoom = async ( req, res ) => {
    try {
        const maPhong = req.params.maPhong;

        if ( id ) {
            let commentFound = await model.binhluan.findAll( {
                where: {
                    maPhong
                }
            } );
            successCode( res, commentFound, 'Lấy bình luận thành công' );
        } else {
            errorCode( res, "Không có id truyền vào" );
        }
    } catch ( err ) {
        errorCode( res, err.message );
    }
}

module.exports = {
    getAllComments,
    getCommentsByRoom,
    updateComment,
    createComment,
    deleteComment,
}