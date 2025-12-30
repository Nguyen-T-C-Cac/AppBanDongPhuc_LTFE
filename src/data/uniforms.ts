
const uniforms = [
    {
        id: 1,
        name: "Office Uniform Polo Shirt",
        price: 179000,
        description:
            "65/35 cotton polo shirt, breathable, suitable for office staff.",
        category: "Company",
        images: [
            "/images/AoPoLoDongPhucCongSo/aotrang.webp",
            "/images/AoPoLoDongPhucCongSo/aotrang1.webp",
            "/images/AoPoLoDongPhucCongSo/aotrang2.webp",
            "/images/AoPoLoDongPhucCongSo/aotrang3.webp",
            "/images/AoPoLoDongPhucCongSo/xanhden.webp",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "S", stock: 342 },
            { size: "M", stock: 111 },
            { size: "L", stock: 445 },
            { size: "XL", stock: 231 },
        ],
        colors: ["White", "Navy"],
        genders: ["Male", "Female"],
        types: ["Polo"],
        allowLogoUpload: true
    },

    {
        id: 2,
        name: "Company Uniform Shirt",
        price: 219000,
        description:
            "Long-sleeved shirt, standard fit, suitable for a professional office environment.",
        category: "Company",
        images: [
            "/images/AoSoMiDongPhuc/trang.png",
            "/images/AoSoMiDongPhuc/xanh.jpg",
            "/images/AoSoMiDongPhuc/navy.jpg",
        ],
        minimumOrderQuantity: 30,
        sizes: [
            { size: "M", stock: 153 },
            { size: "L", stock: 165 },
            { size: "XL", stock: 346 },
            { size: "XXL", stock: 328 },
        ],
        colors: ["White", "Light Blue", "Navy"],
        genders: ["Male", "Female"],
        types: ["Shirt"],
        allowLogoUpload: true
    },

    {
        id: 3,
        name: "Office Uniform Trousers",
        price: 319000,
        description:
            "Long trousers, standard fit, suitable for a professional office environment.",
        category: "Company",
        images: [
            "/images/QuanTayDongPhucCS/Company_Quantay_den.jpg",
            "/images/QuanTayDongPhucCS/quantaydennu.jpg",
            "/images/QuanTayDongPhucCS/quantayxanhden.jpg",
            "/images/QuanTayDongPhucCS/quantayxanhdennu.jpg"
        ],
        minimumOrderQuantity: 30,
        sizes: [
            { size: "M", stock: 124 },
            { size: "L", stock: 148 },
            { size: "XL", stock: 219 },
            { size: "XXL", stock: 523 },
        ],
        colors: ["Black", "Dark Blue"],
        genders: ["Male", "Female"],
        types: ["Pants"],
        allowLogoUpload: false
    },

    {
        id: 4,
        name: "Office Uniform Skirt",
        price: 289000,
        description:
            "Short skirt, standard fit, suitable for a professional office environment.",
        category: "Company",
        images: [
            "/images/ChanVayDongPhucCS/den.jpg",
            "/images/ChanVayDongPhucCS/gray.jpg",
            "/images/ChanVayDongPhucCS/xanh.jpg",
            "/images/ChanVayDongPhucCS/xanhden.jpg",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "M", stock: 156 },
            { size: "L", stock: 142 },
            { size: "XL", stock: 89 },
            { size: "XXL", stock: 52 },
        ],
        colors: ["Black", "Dark Blue"],
        types: ["Skirt"],
        allowLogoUpload: false
    },

    {
        id: 5,
        name: "Full Office Uniform Set",
        price: 799000,
        description:
            "Standard fit uniform set, suitable for a professional office environment.",
        category: "Company",
        images: [
            "/images/DongPhucCongSo/mb2.webp",
            "/images/DongPhucCongSo/mb1.webp",
            "/images/DongPhucCongSo/mbbank.jpg",
        ],
        minimumOrderQuantity: 30,
        sizes: [
            { size: "M", stock: 147 },
            { size: "L", stock: 248 },
            { size: "XL", stock: 389 },
            { size: "XXL", stock: 223 },
        ],
        colors: ["Light Blue", "Blue", "White"],
        genders:["Male", "Female"],
        types: ["Set"],
        allowLogoUpload: true,
    },

    {
        id: 6,
        name: "Middle and High School Student Uniform",
        price: 269000,
        description:
            "Student uniform made of Kate fabric, colorfast, easy to wash and iron.",
        category: "School",
        images: [
            "images/DongPhucHocSinhTHCS-PT/xanhnhat.jpg",
            "images/DongPhucHocSinhTHCS-PT/trangden.jpg",
            "images/DongPhucHocSinhTHCS-PT/trangvang.jpg",
            "images/DongPhucHocSinhTHCS-PT/xanhden.jpg",
            "images/DongPhucHocSinhTHCS-PT/xanhnavy.jpg",
        ],
        minimumOrderQuantity: 50,
        sizes: [
            { size: "XS", stock: 342 },
            { size: "S", stock: 490 },
            { size: "M", stock: 355 },
            { size: "L", stock: 256 },
        ],
        genders:["Male", "Female"],
        types: ["Shirt"],
        allowLogoUpload: true,
    },

    {
        id: 7,
        name: "Kindergarten Student Uniform",
        price: 159000,
        description:
            "Student uniform made of Kate fabric, colorfast, easy to wash and iron.",
        category: "School",
        images: [
            "/images/DongPhucHocSinhMamNon/cam.jpg",
            "/images/DongPhucHocSinhMamNon/doxanh.jpg",
            "/images/DongPhucHocSinhMamNon/trangxanh.jpg",
            "/images/DongPhucHocSinhMamNon/xanhmint.jpg",
            "/images/DongPhucHocSinhMamNon/xanhtrang.jpg",
        ],
        minimumOrderQuantity: 50,
        sizes: [
            { size: "XS", stock: 241 },
            { size: "S", stock: 132 },
            { size: "M", stock: 557 },
            { size: "L", stock: 362 },
        ],
        genders:["Male", "Female"],
        types: ["Set"],
        allowLogoUpload: true,
    },

    {
        id: 8,
        name: "Primary School Student Uniform",
        price: 109000,
        description:
            "Student uniform made of Kate fabric, colorfast, easy to wash and iron.",
        category: "School",
        images: [
            "/images/DongPhucHocSinhTieuHoc/dotrang.jpg",
            "/images/DongPhucHocSinhTieuHoc/trangden.jpg",
            "/images/DongPhucHocSinhTieuHoc/trangxanhnavy.jpg",
            "/images/DongPhucHocSinhTieuHoc/xanhmint.jpg",
            "/images/DongPhucHocSinhTieuHoc/xanhduongden.jpg",
        ],
        minimumOrderQuantity: 50,
        sizes: [
            {size: "XS", stock: 339},
            {size: "S", stock: 450},
            {size: "M", stock: 372},
            {size: "L", stock: 199},
        ],
        genders: ["Male", "Female"],
        types: ["Shirt"],
        allowLogoUpload: true,
    },

    {
        id: 9,
        name: "Vietnamese Youth Union Shirt",
        price: 119000,
        description:
            "Youth Union shirt, cotton fabric, colorfast, easy to wash and iron.",
        category: "School",
        images: [
            "/images/AoThanhNienVietNam/dai.jpg",
            "/images/AoThanhNienVietNam/ngan.jpg",
            "/images/AoThanhNienVietNam/somidai.jpg",
            "/images/AoThanhNienVietNam/somingan.jpg",
        ],
        minimumOrderQuantity: 50,
        sizes: [
            {size: "XS", stock: 330},
            {size: "S", stock: 405},
            {size: "M", stock: 351},
            {size: "L", stock: 203},
        ],
        genders: ["Male", "Female"],
        types: ["Shirt"],
        allowLogoUpload: false,
    },

    {
        id: 10,
        name: "Ao Dai (Traditional Dress)",
        price: 499000,
        description:
            "Women's Ao Dai in diverse fabrics, comfortable, easy to wash.",
        category: "School",
        images: [
            "/images/AoDaiHocSinh/trangnga.jpg",
            "/images/AoDaiHocSinh/trangxanh.jpg",
        ],
        minimumOrderQuantity: 4,
        sizes: [
            {size: "XS", stock: 323},
            {size: "S", stock: 440},
            {size: "M", stock: 352},
            {size: "L", stock: 247},
        ],
        types:["Set","Silk", "Chiffon", "Voile"],
        allowLogoUpload: false
    },


    {
        id: 11,
        name: "Labor Protection Uniform",
        price: 320000,
        description:
            "Protective uniform made of thick kaki, dust-resistant, ensures work safety.",
        category: "Factory",
        images: [
            "/images/DongPhucBaoHoLaoDong/xanhmint.jpg",
            "/images/DongPhucBaoHoLaoDong/xanh.jpg",
            "/images/DongPhucBaoHoLaoDong/xanhden.jpg",
            "/images/DongPhucBaoHoLaoDong/gray.jpg",
        ],
        minimumOrderQuantity: 40,
        sizes: [
            { size: "M", stock: 106 },
            { size: "L", stock: 126 },
            { size: "XL", stock: 112 },
            { size: "XXL", stock: 442 },
        ],
        colors: ["Mint", "Blue", "Grey"],
        genders:["Male", "Female"],
        types: ["Jacket"],
        allowLogoUpload: true,
    },

    {
        id: 12,
        name: "Factory Worker Uniform",
        price: 310000,
        description:
            "Protective uniform made of cotton, dust-resistant, ensures work safety.",
        category: "Factory",
        images: [
            "/images/DongPhucCongNhanNhaMay/xanhlavang.jpg",
            "/images/DongPhucCongNhanNhaMay/dennavy.jpg",
            "/images/DongPhucCongNhanNhaMay/xanhxam.jpg",
            "/images/DongPhucCongNhanNhaMay/gray.jpg",
        ],
        minimumOrderQuantity: 30,
        sizes: [
            { size: "M", stock: 214 },
            { size: "L", stock: 124 },
            { size: "XL", stock: 121 },
            { size: "XXL", stock: 412 },
        ],
        colors: ["Green", "Navy", "Gray"],
        genders:["Male", "Female"],
        types: ["Jacket"],
        allowLogoUpload: true,
    },

    {
        id: 13,
        name: "Construction Engineer Uniform",
        price: 139000,
        description:
            "Uniform made of Kate fabric, dust-resistant, ensures work safety.",
        category: "Factory",
        images: [
            "/images/DongPhucKySuXayDung/kem.jpg",
            "/images/DongPhucKySuXayDung/grey.jpg",
            "/images/DongPhucKySuXayDung/xanhduong.jpg",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "M", stock: 170 },
            { size: "L", stock: 124 },
            { size: "XL", stock: 112 },
            { size: "XXL", stock: 90 },
        ],
        colors: ["Be", "Grey", "Blue"],
        genders:["Male", "Female"],
        types: ["Shirt"],
        allowLogoUpload: true,
    },
    {
        id: 14,
        name: "Construction Worker Uniform Set",
        price: 6990000,
        description:
            "Protective uniform made of kaki, dust-resistant, ensures work safety.",
        category: "Factory",
        images: [
            "/images/DongPhucCongNhanXayDung/doxanh.jpg",
            "/images/DongPhucCongNhanXayDung/xamtrang.jpg",
            "/images/DongPhucCongNhanXayDung/xanhtrang.jpg",
        ],
        minimumOrderQuantity: 10,
        sizes: [
            { size: "M", stock: 150 },
            { size: "L", stock: 160 },
            { size: "XL", stock: 114 },
            { size: "XXL", stock: 68 },
        ],
        colors: ["Red", "Grey", "Blue"],
        genders:["Male", "Female"],
        types:["Set","Hat","Shoes","Pants","Shirt"],
        allowLogoUpload: true,
    },

    {
        id: 15,
        name: "Laboratory Uniform",
        price: 4290000,
        description:
            "Protective uniform made of polyester, resistant to toxic substances and microorganisms.",
        category: "Factory",
        images: [
            "/images/DongPhucPhongThiNghiem/xanh.jpg",
            "/images/DongPhucPhongThiNghiem/anh1.jpg",
            "/images/DongPhucPhongThiNghiem/anh3.jpg",
            "/images/DongPhucPhongThiNghiem/dong-phuc-phong-sach-3.jpg",
        ],
        minimumOrderQuantity: 10,
        sizes: [
            { size: "M", stock: 100 },
            { size: "L", stock: 120 },
            { size: "XL", stock: 110 },
            { size: "XXL", stock: 60 },
        ],
        genders:["Male", "Female"],
        types:["Set", "Shirt", "Pants"],
        allowLogoUpload: true,
    },


    {
        id: 16,
        name: "Event T-Shirt",
        price: 95000,
        description:
            "Round neck T-shirt for events, team building, custom logo printing available.",
        category: "Event",
        images: [
            "/images/AoThunSuKien/aowhite.jpg",
            "/images/AoThunSuKien/aogray.jpg",
            "/images/AoThunSuKien/aogrey.jpg",
            "/images/AoThunSuKien/aoblack.jpg",
        ],
        minimumOrderQuantity: 100,
        sizes: [
            { size: "S", stock: 553 },
            { size: "M", stock: 560 },
            { size: "L", stock: 544 },
            { size: "XL", stock: 400 },
        ],
        colors: ["White", "Gray", "Grey", "Black"],
        genders:["Male","Female"],
        types: ["T-shirt"],
        allowLogoUpload: true,
    },

    {
        id: 17,
        name: "Event Polo Shirt",
        price: 99000,
        description:
            "Polo shirt for events, team building, custom logo printing available.",
        category: "Event",
        images: [
            "/images/AoPoLoSuKien/polo-xanhduongkem.jpg",
            "/images/AoPoLoSuKien/polo-trang.jpg",
            "/images/AoPoLoSuKien/polo-hong.jpg",
            "/images/AoPoLoSuKien/polo-den.jpg",
            "/images/AoPoLoSuKien/polo-nau.jpg",
        ],
        minimumOrderQuantity: 100,
        sizes: [
            { size: "S", stock: 352 },
            { size: "M", stock: 561 },
            { size: "L", stock: 125 },
            { size: "XL", stock: 655 },
        ],
        colors: ["Navy", "White", "Pink", "Black"],
        genders:["Male","Female"],
        types: ["Polo"],
        allowLogoUpload: true,
    },

    {
        id: 18,
        name: "Event Suit Jacket (Vest)",
        price: 599000,
        description:
            "Suit jacket for special occasions, demonstrating luxury and professionalism.",
        category: "Event",
        images: [
            "/images/AoVestSuKien/vest-den.jpg",
            "/images/AoVestSuKien/vest-trang.jpg",
            "/images/AoVestSuKien/vest-xanhmint.jpg",
            "/images/AoVestSuKien/vest-xam.jpg",
        ],
        minimumOrderQuantity: 10,
        sizes: [
            { size: "S", stock: 633 },
            { size: "M", stock: 544 },
            { size: "L", stock: 534 },
            { size: "XL", stock: 367 },
        ],
        colors: ["Black","White", "Mint", "Gray"],
        genders:["Male","Female"],
        types: ["Vest"],
        allowLogoUpload: false,
    },

    {
        id: 19,
        name: "Event Waistcoat / Gile",
        price: 399000,
        description:
            "Waistcoat for special occasions, demonstrating luxury and professionalism.",
        category: "Event",
        images: [
            "/images/AoGileSuKien/mauden.jpg",
            "/images/AoGileSuKien/mautrang.jpg",
            "/images/AoGileSuKien/mauxam.jpg",
        ],
        minimumOrderQuantity: 10,
        sizes: [
            { size: "S", stock: 556 },
            { size: "M", stock: 535 },
            { size: "L", stock: 543 },
            { size: "XL", stock: 512 },
        ],
        colors: ["Black","White", "Gray"],
        genders:["Male","Female"],
        types: ["Vest"],
        allowLogoUpload: false,
    },

    {
        id: 20,
        name: "Event Dress Shirt",
        price: 259000,
        description:
            "Shirt for occasions requiring luxury, politeness, and professionalism.",
        category: "Event",
        images: [
            "/images/AoSoMiSuKien/somi-trang.jpg",
            "/images/AoSoMiSuKien/somi-xanhnavy.jpg",
            "/images/AoSoMiSuKien/somi-den.jpg",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "S", stock: 453 },
            { size: "M", stock: 312 },
            { size: "L", stock: 341 },
            { size: "XL", stock: 241 },
        ],
        colors: ["White","NaVy", "Black"],
        genders:["Male","Female"],
        types: ["Shirt"],
        allowLogoUpload: false,
    },
    {
        id: 21,
        name: "Spring Festival Áo Dài",
        price: 750000,
        description:
            "A refined Vietnamese áo dài crafted for spring celebrations, blending traditional elegance with modern comfort.",
        category: "Event",
        images: [
            "/images/AoDaiDuXuan/xanhnhat3.webp",
            "/images/AoSoMiSuKien/xanhnhat2.webp",
            "/images/AoSoMiSuKien/xanhnhat1.webp",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "S", stock: 453 },
            { size: "M", stock: 312 },
            { size: "L", stock: 341 },
            { size: "XL", stock: 241 },
        ],
        genders:["Female"],
        types: ["Set"],
        allowLogoUpload: false,
    },
    {
        id: 22,
        name: "Men’s Spring Festival Áo Dài",
        price: 747000,
        description:
            "A men’s traditional Vietnamese áo dài designed for spring festivals," +
            " featuring elegant patterns and a comfortable fit, perfect for celebrating Lunar New Year and cultural events.",
        category: "Event",
        images: [
            "/images/AodaiDuXuanNam/aodainamkem.jpg",
            "/images/AodaiDuXuanNam/aodainamxanh.jpg",
            "/images/AodaiDuXuanNam/aodainamxanh1.jpg",
        ],
        minimumOrderQuantity: 25,
        sizes: [
            { size: "S", stock: 453 },
            { size: "M", stock: 312 },
            { size: "L", stock: 341 },
            { size: "XL", stock: 241 },
        ],
        genders:["Male"],
        types: ["Set"],
        allowLogoUpload: false,
    },
    {
        id: 23,
        name: "Modern Áo Dài",
        price: 550000,
        description:
            "A stylish modern áo dài reimagined with contemporary cuts while preserving traditional Vietnamese charm.",
        category: "Event",
        images: [
            "/images/AoDaiTanThoi/cachtantrang.webp",
            "/images/AoDaiTanThoi/cachtando.webp",
            "/images/AoDaiTanThoi/cachtanvang.webp",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "S", stock: 453 },
            { size: "M", stock: 312 },
            { size: "L", stock: 341 },
            { size: "XL", stock: 241 },
        ],
        genders:["Female"],
        types: ["Set"],
        allowLogoUpload: false,
    },
    {
        id: 24,
        name: "Sports T-Shirt",
        price: 119000,
        description:
            "Sports shirt, synthetic fabric, breathable, good elasticity.",
        category: "Sport",
        images: [
            "/images/AoTheThao/xanhtrang.jpg",
            "/images/AoTheThao/xanhtrang1.jpg",
            "/images/AoTheThao/xanhtrang2.jpg",
            "/images/AoTheThao/trang.jpg",
            "/images/AoTheThao/trang1.jpg",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "S", stock: 527 },
            { size: "M", stock: 513 },
            { size: "L", stock: 542 },
            { size: "XL", stock: 328 },
        ],
        colors: ["Blue", "White"],
        genders:["Male","Female"],
        types: ["T-shirt"],
        allowLogoUpload: false,
    },

    {
        id: 25,
        name: "Women's Sports Croptop",
        price: 89000,
        description:
            "Women's croptop, synthetic fabric, breathable, good elasticity.",
        category: "Sport",
        images: [
            "/images/AoCroptopTheThaoNu/den.jpg",
            "/images/AoCroptopTheThaoNu/hong.jpg",
            "/images/AoCroptopTheThaoNu/vang.jpg",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "S", stock: 554 },
            { size: "M", stock: 668 },
            { size: "L", stock: 534 },
            { size: "XL", stock: 475 },
        ],
        colors: ["Black", "Pink", "Yellow"],
        types: ["T-shirt"],
        allowLogoUpload: false,
    },

    {
        id: 26,
        name: "Sports Pants",
        price: 139000,
        description:
            "Long sports pants, synthetic fabric, breathable, good elasticity.",
        category: "Sport",
        images: [
            "/images/QuanDaiTheThao/den.jpg",
            "/images/QuanDaiTheThao/xam.jpg",
            "/images/QuanDaiTheThao/xanhden.jpg",
            "/images/QuanDaiTheThao/xanhnhat.jpg",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "S", stock: 543 },
            { size: "M", stock: 251 },
            { size: "L", stock: 164 },
            { size: "XL", stock: 462 },
        ],
        colors: ["Black", "Gray", "Navy"],
        genders:["Male", "Female"],
        types: ["Pants"],
        allowLogoUpload: false,
    },
    {
        id: 27,
        name: "Sports Skirt",
        price: 149000,
        description:
            "Sports skirt, synthetic fabric, breathable, good elasticity.",
        category: "Sport",
        images: [
            "/images/ChanVayTheThaoNu/vay-den.avif",
            "/images/ChanVayTheThaoNu/vay-den1.avif",
            "/images/ChanVayTheThaoNu/vay-den2.avif",
            "/images/ChanVayTheThaoNu/vay-den3.avif",
            "/images/ChanVayTheThaoNu/vay-trang.avif",
            "/images/ChanVayTheThaoNu/vay-trang1.avif",
            "/images/ChanVayTheThaoNu/vay-trang3.avif",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "S", stock: 536 },
            { size: "M", stock: 599 },
            { size: "L", stock: 549 },
            { size: "XL", stock: 399 },
        ],
        colors: ["Black", "White"],
        types: ["Skirt"],
        allowLogoUpload: false,
    },

    {
        id: 28,
        name: "Men's Sports Shorts",
        price: 99000,
        description:
            "Sports shorts, synthetic fabric, breathable, good elasticity.",
        category: "Sport",
        images: [
            "/images/QuanShortTheThaoNam/den.jpg",
            "/images/QuanShortTheThaoNam/trang.jpg",
            "/images/QuanShortTheThaoNam/xanhden.jpg",
            "/images/QuanShortTheThaoNam/xanhnhat.jpg",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "S", stock: 291 },
            { size: "M", stock: 342 },
            { size: "L", stock: 242 },
            { size: "XL", stock: 403 },
        ],
        colors: ["Black","Grey","Navy"],
        types: ["Short-Pants"],
        allowLogoUpload: false,
    },

    {
        id: 29,
        name: "Chef Jacket",
        price: 229000,
        description:
            "Chef jacket, cotton fabric, good heat insulation, used in cooking.",
        category: "Service",
        images: [
            "/images/AoKhoacDauBep/cam.jpg",
            "/images/AoKhoacDauBep/den.jpg",
            "/images/AoKhoacDauBep/trang.jpg",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "S", stock: 504 },
            { size: "M", stock: 403 },
            { size: "L", stock: 492 },
            { size: "XL", stock: 294 },
        ],
        colors: ["Orange", "Black", "White"],
        genders: ["Male", "Female"],
        types: ["Jacket"],
        allowLogoUpload: true,
    },

    {
        id: 30,
        name: "Server Uniform",
        price: 149000,
        description:
            "Uniform made of cotton, wrinkle-resistant, good color retention.",
        category: "Service",
        images: [
            "/images/DongPhucPhucVu/den.jpg",
            "/images/DongPhucPhucVu/denvang.jpg",
            "/images/DongPhucPhucVu/doden.jpg",
            "/images/DongPhucPhucVu/timvang.jpg",
            "/images/DongPhucPhucVu/trangden.jpg",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "S", stock: 241 },
            { size: "M", stock: 124 },
            { size: "L", stock: 351 },
            { size: "XL", stock: 392 },
        ],
        colors: ["Black", "Yellow", "Red","Purple"],
        genders: ["Male","Female"],
        types: ["Shirt"],
        allowLogoUpload: true,
    },

    {
        id: 31,
        name: "Beauty Salon / Spa Uniform",
        price: 399000,
        description:
            "Uniform made of cotton, polite vest style, good color retention.",
        category: "Service",
        images: [
            "/images/DongPhucThamMyVien/den.jpg",
            "/images/DongPhucThamMyVien/xanhden.jpg",
            "/images/DongPhucThamMyVien/xanhmint.jpg",
            "/images/DongPhucThamMyVien/kem.jpg",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "S", stock: 529 },
            { size: "M", stock: 601 },
            { size: "L", stock: 549 },
            { size: "XL", stock: 389 },
        ],
        colors: ["Black", "Navy", "Mint","Be"],
        genders: ["Male","Female"],
        types: ["Set"],
        allowLogoUpload: true,
    },

    {
        id: 32,
        name: "Delivery Driver Jacket",
        price: 139000,
        description:
            "Jacket with heat insulation and good sun protection.",
        category: "Service",
        images: [
            "/images/AoKhoacGiaoHang/grab.jpg",
            "/images/AoKhoacGiaoHang/be.jpg",
            "/images/AoKhoacGiaoHang/xanhsm.jpg",
            "/images/AoKhoacGiaoHang/shopee.jpg",
            "/images/AoKhoacGiaoHang/shopee1.jpg",
            "/images/AoKhoacGiaoHang/aha.jpg",
        ],
        minimumOrderQuantity: 10,
        sizes: [
            { size: "S", stock: 325 },
            { size: "M", stock: 609 },
            { size: "L", stock: 324 },
            { size: "XL", stock: 501 },
        ],
        types:["Jacket", "Grab","Be","Xanh SM","ShopeeFood","Ahamove"],
        allowLogoUpload: false,
    },

    {
        id: 33,
        name: "Restaurant Uniform",
        price: 279000,
        description:
            "Uniform made of kaki, wrinkle-resistant, good color retention.",
        category: "Service",
        images: [
            "/images/DongPhucNhaHang/dencaro.jpg",
            "/images/DongPhucNhaHang/dentim.jpg",
            "/images/DongPhucNhaHang/dentrang.jpg",
            "/images/DongPhucNhaHang/doden.jpg",
            "/images/DongPhucNhaHang/xanhden.jpg",
        ],
        minimumOrderQuantity: 20,
        sizes: [
            { size: "S", stock: 504 },
            { size: "M", stock: 608 },
            { size: "L", stock: 553 },
            { size: "XL", stock: 398 },
        ],
        colors: ["Black", "White", "Red","Navy"],
        genders: ["Male","Female"],
        types: "Set",
        allowLogoUpload: true,
    },

    {
        id: 34,
        name: "Custom Design Product",
        price: 450000,
        description:
            "Product made according to customer requirements.",
        category: "other-products",
        images: [
            "/images/SanPhamThietKeRieng/anh.jpg",
        ],
        minimumOrderQuantity: 50,
        sizes: [
            { size: "S", stock: 5605 },
            { size: "M", stock: 6430 },
            { size: "L", stock: 5280 },
            { size: "XL", stock: 3970 },
        ],
        types: ["On Request"],
        allowLogoUpload: true,
    },


];

export default uniforms;

