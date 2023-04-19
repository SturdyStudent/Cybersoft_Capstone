const initModels = require( '../models/init-models' );
const sequelize = require( '../models/index' );
const model = initModels( sequelize );
require( 'dotenv' ).config();
const bcrypt = require( 'bcrypt' );
const { generateToken } = require( '../config/jwt' )

const { failCode, successCode, errorCode } = require( '../config/response' );

const login = async ( req, res ) => {
    try {
        let { email, matKhau } = req.body;

        let checkEmail = await model.thongtinnguoidung.findAll( {
            where: {
                email
            }
        } )
        if ( checkEmail.length == 0 ) {
            successCode( res, '', 'Đăng nhập thất bại' );
            return;
        }
        let checkPass = bcrypt.compareSync( matKhau, checkEmail[ 0 ].dataValues.mat_khau );

        if ( checkPass ) {
            let token = generateToken( { data: checkEmail } );

            successCode( res, token, "Login thành công" );
        } else {
            failCode( res, "", "Mật khẩu không đúng !" );
        }
    } catch ( err ) {
        console.log( err );
        errorCode( res, err );
    }
}

const signup = async ( req, res ) => {
    try {
        let { hoTen,
            email,
            matKhau,
            soDienThoai,
            sinhNhat,
            gioiTinh,
            vaiTro } = req.body;

        let checkEmail = await model.thongtinnguoidung.findOne( {
            where: {
                email
            }
        } );

        let modelUser = {
            hoTen,
            email,
            mat_khau: bcrypt.hashSync( matKhau, Number( process.env.HASH_ROUND ) ),
            soDienThoai,
            sinhNhat,
            gioiTinh,
            vaiTro
        }
        if ( checkEmail ) {
            failCode( res, checkEmail, 'Email đã tồn tại' );
            return;
        }
        await model.thongtinnguoidung.create( modelUser );

        successCode( res, modelUser, 'Tạo người dùng thành công' );
    } catch ( err ) {
        errorCode( res, err );
    }
}




module.exports = {
    signup, login
}