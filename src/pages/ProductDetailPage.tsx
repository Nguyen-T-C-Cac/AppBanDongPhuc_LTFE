import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import uniforms from "../data/uniforms";
import "../styles/productDetail.css";

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Tìm product
    const product = uniforms.find((p) => p.id === Number(id));

    // Hooks luôn được gọi
    const [mainImage, setMainImage] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedSize, setSelectedSize] = useState<string>("");

    // Cập nhật state khi product thay đổi
    useEffect(() => {
        if (product) {
            setMainImage(product.images[0]);
            setQuantity(product.minimumOrderQuantity);
            setSelectedSize(product.sizes[0]?.size || "");
        }
    }, [product]);

    if (!product) return <p>Product not found</p>;

    const currentStock =
        product.sizes.find((s) => s.size === selectedSize)?.stock || 0;

    const handleQuantityChange = (value: number) => {
        if (value < product.minimumOrderQuantity) value = product.minimumOrderQuantity;
        if (value > currentStock) value = currentStock;
        setQuantity(value);
    };

    return (
        <div className="product-detail">
            {/* Images */}
            <div className="images">
                <img src={mainImage} alt={product.name} className="main-image" />
                <div className="thumbnails">
                    {product.images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`${product.name}-${idx}`}
                            className={`thumb ${mainImage === img ? "active" : ""}`}
                            onClick={() => setMainImage(img)}
                        />
                    ))}
                </div>
            </div>

            {/* Info */}
            <div className="info">
                <h1>{product.name}</h1>
                <p>{product.price.toLocaleString()} VND</p>
                <p>{product.description}</p>
                <p>Category: {product.category}</p>
                <p>Gender: {product.genders?.join(", ")}</p>

                {/* Size */}
                <div>
                    <label>Size: </label>
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                    >
                        {product.sizes.map((s) => (
                            <option key={s.size} value={s.size}>
                                {s.size} (Stock: {s.stock})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Quantity */}
                <div>
                    <label>Quantity: </label>
                    <input
                        type="number"
                        value={quantity}
                        min={product.minimumOrderQuantity}
                        max={currentStock}
                        onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    />
                    <small>Minimum order: {product.minimumOrderQuantity}</small>
                    <br />
                    {currentStock === 0 && <span style={{ color: "red" }}>Out of stock</span>}
                </div>

                {/* Buttons */}
                <div className="buttons">
                    <button disabled={currentStock === 0}>Add to Cart</button>
                    <button disabled={currentStock === 0}>Buy Now</button>
                </div>
            </div>


        </div>
    );
};

export default ProductDetail;
;