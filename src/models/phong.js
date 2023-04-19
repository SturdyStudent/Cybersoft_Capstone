const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return phong.init(sequelize, DataTypes);
}

class phong extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tenPhong: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    khach: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'thongtinnguoidung',
        key: 'id'
      }
    },
    phongNgu: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    giuong: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phongTam: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    moTa: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    giaTien: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mayGiat: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    tivi: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dieuHoa: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    wifi: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    bep: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    doXe: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    hoBoi: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    banUi: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    maViTri: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'vitriviewmodel',
        key: 'id'
      }
    },
    hinhAnh: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'phong',
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
        name: "khach",
        using: "BTREE",
        fields: [
          { name: "khach" },
        ]
      },
      {
        name: "maViTri",
        using: "BTREE",
        fields: [
          { name: "maViTri" },
        ]
      },
    ]
  });
  }
}
