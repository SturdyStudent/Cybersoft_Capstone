const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return datphong.init(sequelize, DataTypes);
}

class datphong extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    maPhong: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'phong',
        key: 'id'
      }
    },
    ngayDen: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ngayDi: {
      type: DataTypes.DATE,
      allowNull: true
    },
    soLuongKhach: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maNguoiDung: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'thongtinnguoidung',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'datphong',
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
      {
        name: "maNguoiDung",
        using: "BTREE",
        fields: [
          { name: "maNguoiDung" },
        ]
      },
      {
        name: "maPhong",
        using: "BTREE",
        fields: [
          { name: "maPhong" },
        ]
      },
    ]
  });
  }
}
