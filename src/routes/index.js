const express = require( 'express' );
const router = express();
const nguoiDungRouter = require( './nguoiDungRoute' );
const phongRouter = require( './phongRoute' );
const binhLuanRouter = require( './binhLuanRoute' );
const xacThucRouter = require( './xacThucRoute' );
const viTriRouter = require( './viTriRoute' );
const datPhongRouter = require( "./datPhongRoute" );

router.use( '/users', nguoiDungRouter );
router.use( '/dat-phong', datPhongRouter );
router.use( '/binh-luan', binhLuanRouter );
router.use( '/auth', xacThucRouter );
router.use( '/vi-tri', viTriRouter );
router.use( '/phong-thue', phongRouter );

module.exports = { router }