const Sequelize = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) => {
  return thongtinnguoidung.init( sequelize, DataTypes );
}

class thongtinnguoidung extends Sequelize.Model {
  static init( sequelize, DataTypes ) {
    return super.init( {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      hoTen: {
        type: DataTypes.STRING( 100 ),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING( 50 ),
        allowNull: true
      },
      matKhau: {
        type: DataTypes.STRING( 50 ),
        allowNull: true
      },
      soDienThoai: {
        type: DataTypes.STRING( 20 ),
        allowNull: true
      },
      sinhNhat: {
        type: DataTypes.DATE,
        allowNull: true
      },
      gioiTinh: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      vaiTro: {
        type: DataTypes.STRING( 50 ),
        allowNull: true
      },
      hinhAnh: {
        type: DataTypes.STRING( 100 ),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'thongtinnguoidung',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
      ]
    } );
  }
}
