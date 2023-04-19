const DataTypes = require("sequelize").DataTypes;
const _binhluan = require("./binhluan");
const _datphong = require("./datphong");
const _phong = require("./phong");
const _thongtinnguoidung = require("./thongtinnguoidung");
const _vitriviewmodel = require("./vitriviewmodel");

function initModels(sequelize) {
  const binhluan = _binhluan(sequelize, DataTypes);
  const datphong = _datphong(sequelize, DataTypes);
  const phong = _phong(sequelize, DataTypes);
  const thongtinnguoidung = _thongtinnguoidung(sequelize, DataTypes);
  const vitriviewmodel = _vitriviewmodel(sequelize, DataTypes);

  binhluan.belongsTo(phong, { as: "maPhong_phong", foreignKey: "maPhong"});
  phong.hasMany(binhluan, { as: "binhluans", foreignKey: "maPhong"});
  datphong.belongsTo(phong, { as: "maPhong_phong", foreignKey: "maPhong"});
  phong.hasMany(datphong, { as: "datphongs", foreignKey: "maPhong"});
  binhluan.belongsTo(thongtinnguoidung, { as: "maNguoiBinhLuan_thongtinnguoidung", foreignKey: "maNguoiBinhLuan"});
  thongtinnguoidung.hasMany(binhluan, { as: "binhluans", foreignKey: "maNguoiBinhLuan"});
  datphong.belongsTo(thongtinnguoidung, { as: "maNguoiDung_thongtinnguoidung", foreignKey: "maNguoiDung"});
  thongtinnguoidung.hasMany(datphong, { as: "datphongs", foreignKey: "maNguoiDung"});
  phong.belongsTo(thongtinnguoidung, { as: "khach_thongtinnguoidung", foreignKey: "khach"});
  thongtinnguoidung.hasMany(phong, { as: "phongs", foreignKey: "khach"});
  phong.belongsTo(vitriviewmodel, { as: "maViTri_vitriviewmodel", foreignKey: "maViTri"});
  vitriviewmodel.hasMany(phong, { as: "phongs", foreignKey: "maViTri"});

  return {
    binhluan,
    datphong,
    phong,
    thongtinnguoidung,
    vitriviewmodel,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
