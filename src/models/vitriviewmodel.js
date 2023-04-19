const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return vitriviewmodel.init(sequelize, DataTypes);
}

class vitriviewmodel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tenViTri: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tinhThanh: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    quocGia: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    hinhAnh: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vitriviewmodel',
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
  });
  }
}
