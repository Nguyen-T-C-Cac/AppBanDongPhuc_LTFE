import { useParams, useNavigate } from "react-router-dom";
import React, {useState, useEffect, useMemo} from "react";
import uniforms from "../data/uniforms";
import "../styles/productDetail.css";
import {reviews} from "../data/reviews";
import LogoCustomizationModal  from "../components/cart/LogoCustomizationModal";
import { LogoCustomization } from "../types/CartType";
import ProductGrid from "./Products/ProductGrid";
import {Product} from "../types/ProductType";
import { accountData } from "../data/account";
import { FaStar, FaRegStar } from "react-icons/fa";

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    /* ================== PRODUCT ================== */
    const product = useMemo(
        () => uniforms.find(p => p.id === Number(id)),
        [id]
    );

    /* ================== STATES ================== */
    const [mainImage, setMainImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedGender, setSelectedGender] = useState("");
    const [showLogoModal, setShowLogoModal] = useState(false);
    const [logoCustomization, setLogoCustomization] =
        useState<LogoCustomization>({
            logoType: "No Logo",
            positions: [],
            width: "",
            height: "",
            notes: "",
        });

    const [openTab, setOpenTab] =
        useState<"description" | "comment" | null>("description");

    const [selectedRating, setSelectedRating] =
        useState<number | null>(null);
    const ratingFilters = [
        { label: "Tất cả", value: null },
        { label: "1 sao", value: 1 },
        { label: "2 sao", value: 2 },
        { label: "3 sao", value: 3 },
        { label: "4 sao", value: 4 },
        { label: "5 sao", value: 5 },
    ];
    const [selectedType, setSelectedType] = useState<string | null>(null);


    /* ================== USERS MAP ================== */
    const userMap = useMemo(() => {
        return Object.fromEntries(
            accountData.users.map(u => [u.id, u])
        );
    }, []);

    /* ================== REVIEWS ================== */
    const productReviews = useMemo(() => {
        if (!product) return [];
        return reviews.filter(r => r.productId === product.id);
    }, [product]);

    const filteredReviews = useMemo(() => {
        if (selectedRating === null) return productReviews;
        return productReviews.filter(r => r.rating === selectedRating);
    }, [productReviews, selectedRating]);
    const normalizeTypes = (types: string | string[]) =>
        Array.isArray(types) ? types : [types];

    const featuredProducts = useMemo(() => {
        if (!product) return [];
        const productTypes = normalizeTypes(product.types);
        return uniforms
            .filter(u => {
                if (u.id === product.id) return false;
                const uTypes = normalizeTypes(u.types);
                return uTypes.some(type =>
                    productTypes.includes(type)
                );
            })
            .slice(0, 8);
    }, [product]);
    /* ================== RATING ================== */
    const totalComments = productReviews.length;
    const averageRating = useMemo(() => {
        if (totalComments === 0) return 0;
        return (
            productReviews.reduce((sum, r) => sum + r.rating, 0) /
            totalComments
        );
    }, [productReviews, totalComments]);
    const handleToggleComment = () => {
        setOpenTab(prev => (prev === "comment" ? null : "comment"));
    };
    /* ================== EFFECTS ================== */
    useEffect(() => {
        if (!product) return;
        setMainImage(product.images[0]);
        setSelectedSize(product.sizes[0].size);
        setQuantity(product.minimumOrderQuantity);
        if (product.genders?.length) {
            setSelectedGender(product.genders[0]);
        }
    }, [product]);
    useEffect(() => {
        if (!product) return;
        const stock =
            product.sizes.find(s => s.size === selectedSize)?.stock ?? 0;
        if (stock === 0) {
            setQuantity(0);
            return;
        }
        setQuantity(q =>
            Math.min(Math.max(product.minimumOrderQuantity, q), stock)
        );
    }, [selectedSize, product]);
    /* ================== EARLY RETURN ================== */
    if (!product) return <p>Product not found</p>;
    /* ================== HANDLERS ================== */
    const currentStock =
        product.sizes.find(s => s.size === selectedSize)?.stock || 0;
    const increase = () => {
        if (quantity < currentStock) setQuantity(q => q + 1);
    };
    const decrease = () => {
        if (quantity > product.minimumOrderQuantity) {
            setQuantity(q => q - 1);
        }
    };
    const currentImageIndex =
        product.images.findIndex(img => img === mainImage);
    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setMainImage(product.images[currentImageIndex - 1]);
        }
    };
    const handleNextImage = () => {
        if (currentImageIndex < product.images.length - 1) {
            setMainImage(product.images[currentImageIndex + 1]);
        }
    };
    return (
        <div className="product-detail">
            {/* Images */}
            <div className="images">
                <button className="nav-btn left" onClick={handlePrevImage} disabled={currentImageIndex === 0}>
                    &lt;&lt;
                </button>
                <img src={mainImage} alt={product.name} className="main-image"/>
                <button className="nav-btn right" onClick={handleNextImage}
                        disabled={currentImageIndex === product.images.length - 1}>&gt;&gt;</button>
                <div className="thumbnails">
                    {product.images.map((img, idx) => (
                        <img key={idx} src={img} alt={`${product.name}-${idx}`} className={`thumb ${mainImage === img ? "active" : ""}`}
                            onClick={() => setMainImage(img)}/>))}
                </div>
            </div>
            {/* Info */}
            <div className="info">
                <h1>{product.name}</h1>
                <div className="rating-row">
                    <div className={"rating-sao"}>
                        <span className="rating-number">
                            {averageRating.toFixed(1)}
                        </span>
                        <div className="stars">
                            {Array.from({ length: 5 }).map((_, i) =>
                                i < Math.floor(averageRating) ? (
                                    <FaStar key={i} className="star full" />
                                ) : (
                                    <FaRegStar key={i} className="star empty" />
                                )
                            )}
                            {Array.from({ length: 5 }).map((_, i) =>
                                i < Math.floor(averageRating) ? (
                                    <FaStar key={i} className="star full" />
                                ) : (
                                    <FaRegStar key={i} className="star empty" />
                                )
                            )}
                        </div>
                    </div>
                    <span className="comment-count">
                        Comment : {totalComments}
                    </span>
                </div>
                <p className="info-price">{product.price.toLocaleString()} VND</p>
                <div className="shipping-row">
                    <span className="shipping-label">Shipping:</span>
                    <span className="shipping-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 4h11v8h4l3 4v4h-2a2 2 0 11-4 0H9a2 2 0 11-4 0H3V4z" stroke="currentColor"
                                  strokeWidth="2" strokeLinejoin="round"/>
                            <circle cx="7" cy="18" r="2" fill="currentColor" />
                            <circle cx="17" cy="18" r="2" fill="currentColor" />
                        </svg>
                    </span>
                    <span className="shipping-text">Receive between Dec 17 – Dec 19</span>
                    <button className="shipping-change-btn" onClick={() => {
                        console.log("Change shipping method");}}
                            aria-label="Change shipping method">&gt;</button>
                </div>
                {/* Size */}
                <div className="size-logo-row">
                    <div className={"size-row"}>
                        <label className="info-size">Size:</label>
                        <select value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}>
                            {product.sizes.map((s) => (
                                <option key={s.size} value={s.size}>{s.size}</option>))}
                        </select>
                        <span className="size-stock">Stock: {
                            product.sizes.find(s => s.size === selectedSize)?.stock ?? 0}
                    </span>
                    </div>
                    <div className="logo-row">
                        <p className="logo-text">Logo type:</p>
                        <button className="logo-dropdown-btn"
                            onClick={() => setShowLogoModal(true)}>
                            {logoCustomization.logoType}
                            <span className="arrow">˅</span>
                        </button>
                        {logoCustomization.image && (
                            <img src={logoCustomization.image} alt="logo preview" className="mini-logo-thumb"/>
                        )}
                    </div>
                    <LogoCustomizationModal isOpen={showLogoModal} onClose={() => setShowLogoModal(false)}
                        initialData={logoCustomization}
                        onSave={(data) => {
                            setLogoCustomization(data);
                            setShowLogoModal(false);
                        }}
                    />
                </div>
                {/* Gender */}
                {product.genders && product.genders.length > 0 && (
                    <div className="gender-row">
                        <label className="info-gender">Gender:</label>
                        <div className="gender-options">
                            {product.genders.map((g) => (
                                <button key={g} type="button"
                                    className={`gender-btn ${selectedGender === g ? "active" : ""}`}
                                    onClick={() => setSelectedGender(g)}>{g}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {/* Quantity */}
                <div className="quantity-wrapper">
                    <label>Quantity</label>
                    <div className="quantity-control">
                        <button className="qty-btn" onClick={decrease} disabled={quantity <= product.minimumOrderQuantity}>−</button>
                        <input type="number" value={quantity === 0 ? "" : quantity}
                            min={product.minimumOrderQuantity} max={currentStock}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === "") setQuantity(0);
                                else setQuantity(Number(val));
                            }}
                            onBlur={() => {
                                if (quantity < product.minimumOrderQuantity) setQuantity(product.minimumOrderQuantity);
                                else if (quantity > currentStock) setQuantity(currentStock);
                            }}
                        />
                        <button className="qty-btn" onClick={increase} disabled={quantity >= currentStock}>+</button>
                    </div>
                    <small>Minimum order: {product.minimumOrderQuantity}</small>
                    {currentStock === 0 && <span className="out-of-stock">Out of stock</span>}
                </div>
                {/* Buttons */}
                <div className="buttons">
                    <button disabled={currentStock === 0}>Add to Cart</button>
                    <button disabled={currentStock === 0}>Buy Now</button>
                </div>
            </div>
            {/* DESCRIPTION & COMMENT */}
            <div className="product-tabs">
                {/* DESCRIPTION */}
                <div className="tab-item">
                    <div className="tab-header" onClick={() =>
                            setOpenTab(openTab === "description" ? null : "description")}>
                        <span>Description</span>
                        <span className={`arrow ${openTab === "description" ? "open" : ""}`}>⌄</span>
                    </div>
                    {openTab === "description" && (
                        <div className="tab-content">
                            <p>{product.description}</p>
                        </div>
                    )}
                </div>
                {/* COMMENT */}
                <div className="tab-item">
                    <div className="tab-header" onClick={handleToggleComment}>
                        <span>Comment</span>
                        <span className={`arrow ${openTab === "comment" ? "open" : ""}`}>⌄</span>
                    </div>
                    {openTab === "comment" && (
                        <div className="tab-content">
                            <div className="review-section">
                                {/* LEFT SUMMARY */}
                                <div className="review-summary">
                                    <div className="rating-score">
                                        {averageRating.toFixed(1)}
                                    </div>
                                    <div className="rating-stars">
                                        {Array.from({ length: 5 }).map((_, i) =>
                                            i < Math.floor(averageRating) ? (
                                                <FaStar key={i} className="star full" />
                                            ) : (
                                                <FaRegStar key={i} className="star empty" />
                                            )
                                        )}
                                    </div>
                                    <div className="rating-count">
                                        {productReviews.length} đánh giá
                                    </div>
                                </div>
                                {/* RIGHT CONTENT */}
                                <div className="review-content">
                                    <div className="rating-filter">
                                        {ratingFilters.map((f) => (
                                            <button key={f.label} className={selectedRating === f.value ? "active" : ""}
                                                onClick={() => setSelectedRating(f.value)}>{f.label}
                                            </button>
                                        ))}
                                    </div>
                                    {/* COMMENTS */}
                                    <div className="review-list">
                                        {filteredReviews.length === 0 ? (
                                            <p>No comments yet</p>
                                        ) : (
                                            filteredReviews.map((r) => {
                                                const user = userMap[r.userId];
                                                return (
                                                    <div key={r.id} className="comment-item">
                                                        <div className="comment-header">
                                                            {user?.avatar && (
                                                                <img src={user.avatar} alt={user.name} className="comment-avatar"/>
                                                            )}
                                                            <div>
                                                                <strong>
                                                                    {user?.name ?? "Anonymous"}
                                                                </strong>
                                                                <div className="comment-meta">
                                                                    <span>{r.date}</span>
                                                                    <span> • </span>
                                                                    <span>{r.time}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="comment-rating">
                                                            {Array.from({ length: r.rating }).map((_, i) => (
                                                                <FaStar key={`full-${i}`} className="star full"/>
                                                            ))}
                                                            {Array.from({ length: 5 - r.rating }).map((_, i) => (
                                                                <FaRegStar key={`empty-${i}`} className="star empty"/>
                                                            ))}
                                                        </div>
                                                        <p className="comment-text">{r.comment}</p>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/*LIST PRODUCT*/}
            <div className="list-products-section">
                <div className="products-page">
                    <h2 className="section-title">
                        {selectedType ? selectedType.toUpperCase() : "RECOMMENDED PRODUCTS"}
                    </h2>
                    <ProductGrid products={featuredProducts as Product[]} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
;