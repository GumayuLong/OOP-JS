function DSSV() {
    // Properties
    // Chứa các đối tượng sinh viên bên sinhvien.js
    this.arr = [];

    // Methods
    this.themSV =  function(sv){
        this.arr.push(sv);
    };

    this._timViTri = function(maSV){
        /**
         * tìm vị trí của đối tượng trong mảng
         * 0. tạo index = -1
         * 1. duyệt mảng arr => pick object sv
         *      1.1. Kiểm tra maSV có trùng với sv.maSV
         *          => true => cập nhật giá trị index từ i
         */

        var index = -1;
        for (var i = 0; i < this.arr.length; i++){
            var sv = this.arr[i];
            if (sv.maSV === maSV){
                index = i;
                break;
            }
        }
        return index;
    }

    this._xoaSV = function(maSV){
        var index = this._timViTri(maSV);

        if(index !== -1){
            // Xóa phần tử của mảng: dựa vào index và số lượng phần tử để xóa
            this.arr.splice(index, 1);
        }
    };

    this.layThongTinChiTietSV = function(maSV){
        // tìm vị trí
        var index = this._timViTri(maSV);

        if (index !== -1){
            var sv = this.arr[index];
            return sv; 
        }
    };
    this.capNhatSV = function(sv){
        // tìm vị trí sv cần update
        var index = this._timViTri(sv.maSV);
        if (index !== -1){
            //update
            this.arr[index] = sv;
        }
    };
}

// this.timKiemSV = function(){};
DSSV.prototype.timKiemSV = function(keyword){
    var mangTimKiem = [];
    for (var i = 0; i < this.arr.length; i++){
        var sv = this.arr[i];
        // keyword => convert chữ thường
        var keywordLowerCase = keyword.toLowerCase();
        // sv.tenSV => convert chữ thường
        var tenSVLowerCase = sv.tenSV.toLowerCase();
        if (tenSVLowerCase.indexOf(keywordLowerCase) !== -1) {
			mangTimKiem.push(sv);
		}
    }
    return mangTimKiem;
};