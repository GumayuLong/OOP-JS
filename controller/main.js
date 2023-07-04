// Global
var dssv = new DSSV();
// mỗi lần reload web => gọi lại hàm getLocalStorage
getlocalStorage();

function getEle(id){
    return document.getElementById(id);
}

function layThongTinSV(){
	// Dom lấy thông tin từ các input
	var maSV = getEle("txtMaSV").value;
	var tenSV = getEle("txtTenSV").value;
	var email = getEle("txtEmail").value;
	var matKhau = getEle("txtPass").value;
	var ngaySinh = getEle("txtNgaySinh").value;
	var khoaHoc = getEle("khSV").value;
	var diemToan = getEle("txtDiemToan").value;
	var diemLy = getEle("txtDiemLy").value;
	var diemHoa = getEle("txtDiemHoa").value;

	// Tạo đối tượng sv từ lớp đối tượng SinhVien
	var sv = new SinhVien(
		maSV,
		tenSV,
		email,
		matKhau,
		ngaySinh,
		khoaHoc,
		diemToan,
		diemLy,
		diemHoa
	);

	// Tính điểm trung bình
	sv.tinhDTB();

	return sv;
}

// cach 1
// function renderTable(data){
// 	var content = "";

// 	for (var i = 0; i < data.length; i++){
// 		var sv = data[i];

// 		content += "<tr>"
// 		content += "<td>" + sv.maSV + "</td>"
// 		content += "<td>" + sv.tenSV + "</td>"
// 		content += "<td>" + sv.email + "</td>"
// 		content += "<td>" + sv.ngaySinh + "</td>"
// 		content += "<td>" + sv.khoaHoc + "</td>"
// 		content += "<td>" + sv.dtb + "</td>"
// 		content += "</td>"
// 	}
// 	getEle("tbodySinhVien").innerHTML = content;
// }

//cach 2
function renderTable(data){
	var content = "";

	for (var i = 0; i < data.length; i++){
		var sv = data[i];
		content += `
			<tr>
				<td>${sv.maSV}</td>
				<td>${sv.tenSV}</td>
				<td>${sv.email}</td>
				<td>${sv.ngaySinh}</td>
				<td>${sv.khoaHoc}</td>
				<td>${sv.dtb}</td>
				<td>
					<button class="btn btn-info" onclick="suaSV('${sv.maSV}')">Sửa</button>
					<button class="btn btn-danger" onclick="xoaSV('${sv.maSV}')">Xóa</button>
				</td>
			</tr>
		`;
	}
	getEle("tbodySinhVien").innerHTML = content;
}

// tìm kiếm SV
// cách 1
// getEle("txtSearch").addEventListener("keyup", function(){
// 	// console.log("123");
// });

//cách 2
function searchSV(){
	var txtSearch = getEle("txtSearch").value;
	var mangTimKiem = dssv.timKiemSV(txtSearch);
	renderTable(mangTimKiem);
}
getEle("txtSearch").addEventListener("keyup", searchSV);

// Sửa sinh viên
function suaSV(maSV){
	// console.log(maSV); //kiểm tra nút sửa nhận được sự kiện chưa
	var sv = dssv.layThongTinChiTietSV(maSV);
	// console.log(sv);
	
	if (sv){
		// DOM tới các thẻ input => show info sv
		getEle("txtMaSV").value = sv.maSV;
		// disabled #txtMaSV (Khóa không cho phép sửa mã sinh viên)
		getEle("txtMaSV").disabled = true;

		getEle("txtTenSV").value = sv.tenSV;
		getEle("txtEmail").value = sv.email;
		getEle("txtPass").value = sv.matKhau;
		getEle("txtNgaySinh").value = sv.ngaySinh;
		getEle("khSV").value = sv.khoaHoc;
		getEle("txtDiemToan").value = sv.diemToan;
		getEle("txtDiemLy").value = sv.diemLy;
		getEle("txtDiemHoa").value = sv.diemHoa;

		//DOM id của nút cập nhật cho nó show ra
		getEle("btnCapNhatSV").style.display = "inline-block";
		// DOM #btnThemSV => hide
		getEle("btnThemSV").style.display = "none";
	}
}

// Cập nhật
getEle("btnCapNhatSV").onclick = function(){
	// Lấy thông tin của user
	var sv = layThongTinSV();
	// console.log(sv);
	dssv.capNhatSV(sv);
	renderTable(dssv.arr);
	setLocalStorage();
}

// Xóa sinh viên
function xoaSV(maSV) {
	// console.log(maSV);
	dssv._xoaSV(maSV);
	// console.log(dssv.arr);
	//render lại table
	renderTable(dssv.arr);
	setLocalStorage();
}

function themSinhVien() {
	var sv = layThongTinSV();
	// console.log(sv);

	// thêm sv vào DSSV
	dssv.themSV(sv);
	// console.log(dssv.arr);

	// render dssv ra ngoài table
	renderTable(dssv.arr);

	// Lưu dssv.arr xuống localStorage của browser
	setLocalStorage();
	
}

function getlocalStorage() {
	if (localStorage.getItem("DSSV")) {
		var dataString = localStorage.getItem("DSSV");
		// convert string => JSON
		var dataJSON = JSON.parse(dataString);
		// Nạp dữ lieuj lại cho dssv.arr
		dssv.arr = dataJSON;
		//render lại table
		renderTable(dssv.arr);
	}
}

function setLocalStorage(){
	//convert JSON => string
	var dataString = JSON.stringify(dssv.arr);
	localStorage.setItem("DSSV", dataString);
}