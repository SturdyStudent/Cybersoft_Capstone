CREATE DATABASE AIR_BNB
USE AIR_BNB
CREATE TABLE ThongTinNguoiDung(
	id	INT PRIMARY KEY AUTO_INCREMENT,
	hoTen VARCHAR(100),
	email VARCHAR(50),
	matKhau VARCHAR(50),
	soDienThoai VARCHAR(20),
	sinhNhat DATETIME,
	gioiTinh boolean,
	vaiTro VARCHAR(50)
    
)

CREATE TABLE DangNhapView(
email	VARCHAR(50) PRIMARY KEY,
matKhau	VARCHAR(50)
)

CREATE TABLE BinhLuan(
	id	INT PRIMARY KEY AUTO_INCREMENT,
	maPhong	INT,
	maNguoiBinhLuan	INT,
	ngayBinhLuan VARCHAR(100),
	noiDung	VARCHAR(100),
	saoBinhLuan	INT
)

ALTER TABLE BinhLuan ADD FOREIGN KEY (maNguoiBinhLuan) REFERENCES ThongTinNguoiDung(id) 
ALTER TABLE BinhLuan ADD FOREIGN KEY (maPhong) REFERENCES Phong(id) 

CREATE TABLE DatPhong(
	id	INT PRIMARY KEY AUTO_INCREMENT,
	maPhong	INT,
	ngayDen	DATETIME,
	ngayDi	DATETIME,
	soLuongKhach	INT,
	maNguoiDung	INT
)

ALTER TABLE DatPhong ADD FOREIGN KEY (maNguoiDung) REFERENCES ThongTinNguoiDung(id) 
ALTER TABLE DatPhong ADD FOREIGN KEY (maPhong) REFERENCES Phong(id) 

CREATE TABLE CapNhatNguoiDung{
	id	INT,
	hoTen	VARCHAR(100),
	email	VARCHAR(100),
	soDienThoai	VARCHAR(100),
	sinhNhat	VARCHAR(100),
	gioiTinh	boolean,
	vaiTro	VARCHAR(100),
}

UPDATE TABLE Phong(
	id	INT PRIMARY KEY AUTO_INCREMENT,
	tenPhong VARCHAR(100),
	khach INT,
	phongNgu INT,
	giuong INT,
	phongTam INT,
	moTa VARCHAR(100),
	giaTien	INT,
	mayGiat	boolean,
	tivi	boolean,
	dieuHoa	boolean,
	wifi	boolean,
	bep	boolean,
	doXe	boolean,
	hoBoi	boolean,
	banUi	boolean,
	maViTri	INT,
	hinhAnh	VARCHAR(100)
    

)
ALTER TABLE Phong ADD FOREIGN KEY (khach) REFERENCES ThongTinNguoiDung(id) 
ALTER TABLE Phong ADD FOREIGN KEY (maViTri) REFERENCES ViTriViewModel(id) 

CREATE TABLE ViTriViewModel(
	id	INT PRIMARY KEY AUTO_INCREMENT,
	tenViTri	VARCHAR(100),
	tinhThanh	VARCHAR(100),
	quocGia	VARCHAR(100),
	hinhAnh	VARCHAR(100)
)










