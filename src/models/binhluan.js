const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return binhluan.init(sequelize, DataTypes);
}

class binhluan extends Sequelize.Model {
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
    maNguoiBinhLuan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'thongtinnguoidung',
        key: 'id'
      }
    },
    ngayBinhLuan: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    noiDung: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    saoBinhLuan: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'binhluan',
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
        name: "maNguoiBinhLuan",
        using: "BTREE",
        fields: [
          { name: "maNguoiBinhLuan" },
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
