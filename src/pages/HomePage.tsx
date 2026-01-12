import React, {useState} from "react";
import "../styles/home.css";
/* ABOUT IMAGES */
import bgAbout from "../assets/images/ImageHome/indexdp1.jpg";
import imgLeft from "../assets/images/ImageHome/indexdp3.jpg";
import imgRight from "../assets/images/ImageHome/indexdp2.jpg";
import imgReason from "../assets/images/ImageHome/indexdp4.jpg";
import imgReason2 from "../assets/images/ImageHome/indexdp5.jpg";

/* PRODUCTS */
import p1 from "../assets/images/ImageHome/aothundp.jpg";
import p2 from "../assets/images/ImageHome/somidp.jpg";
import p3 from "../assets/images/ImageHome/aokhoatdp.jpg";
import p4 from "../assets/images/ImageHome/laodongdp.png";
import p5 from "../assets/images/ImageHome/spadp.jpg";
import p6 from "../assets/images/ImageHome/hocsinhdp.png";
/*PRINCIPLES*/
import icon1 from "../assets/images/ImageHome/icon/icon1.png";
import icon2 from "../assets/images/ImageHome/icon/icon2.png";
import icon3 from "../assets/images/ImageHome/icon/icon3.png";
import icon4 from "../assets/images/ImageHome/icon/icon4.png";
import ProductGrid from "./Products/ProductGrid";
import {Product} from "../types/ProductType";
import uniforms from "../data/uniforms";
import {useSelector} from "react-redux";
import {RootState} from "../components/redux/Store";
import  { useMemo } from "react";

const products = [
    { id: 1, name: "Company uniform shirt", image: p1 },
    { id: 2, name: "Uniform T-shirt", image: p2 },
    { id: 3, name: "Uniform jacket", image: p3 },
    { id: 4, name: "Workwear", image: p4 },
    { id: 5, name: "Spa uniform", image: p5 },
    { id: 6, name: "School uniforms", image: p6 },
];

function HomePage() {
    const keyword = useSelector(
        (state: RootState) => state.search.keyword
    );
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const filteredProducts = uniforms.filter(
        u => {
            const mType = selectedType
                ? u.types.includes(selectedType)
                : true;
            const mKeyword = keyword
                ? u.name.toLowerCase().includes(keyword.toLowerCase())
                : true;
            return mType && mKeyword;
        });
    const featuredProducts = useMemo(() => {
        return filteredProducts.slice(20, 30);
    }, [filteredProducts]);


    return (
        <main className="home-container">
            {/* ================= ABOUT ================= */}
            <section className="about-section" style={{ backgroundImage: `url(${bgAbout})` }}>
                <div className="about-overlay"></div>
                <div className="about-content">
                    <h2>About Us</h2>
                    <p className="intro">
                        Specializing in the design and tailoring of uniforms
                        for schools, events, and businesses.
                    </p>
                    <p>
                        With a focus on style, comfort, and durability, we are
                        committed to delivering professional uniform solutions
                        that enhance brand identity and team spirit.
                    </p>
                </div>
                <div className="about-image left">
                    <img src={imgLeft} alt="about left" />
                </div>
                <div className="about-image right">
                    <img src={imgRight} alt="about right" />
                </div>
            </section>

            {/* ================= REASON ================= */}
            <section className="reason-section">
                <div className="reason-container">
                    <div className="reason-text">
                        <h3>Reason for Establishment</h3>
                        <p>
                            Uniform91 was created to provide modern uniform solutions that help
                            businesses and organizations build a professional image at a
                            reasonable cost. Uniforms are not only workwear but also an
                            effective and long-term branding solution.
                        </p>
                    </div>
                    <div className="reason-images">
                        <div className="image-large">
                            <img src={imgReason} alt="Large" />
                            <div className="image-small">
                                <img src={imgReason2} alt="Small" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= PRINCIPLES ================= */}
            <section className="principles-section">
                <h3>OPERATING PRINCIPLES</h3>
                <p className="principles-desc">
                    Uniform91 xây dựng niềm tin với khách hàng và đối tác bằng cách tuân thủ nghiêm ngặt bốn nguyên tắc cốt lõi sau:
                </p>
                <div className="principles-list">
                    <div className="principle-item">
                        <img src={icon1} alt="On-time delivery" className="principle-icon" />
                        <h4>ON-TIME DELIVERY</h4>
                        <p>Always deliver products on schedule.</p>
                    </div>

                    <div className="principle-item">
                        <img src={icon2} alt="Dedicated consultation" className="principle-icon" />
                        <h4>DEDICATED CONSULTATION</h4>
                        <p>Professional support for customers.</p>
                    </div>

                    <div className="principle-item">
                        <img src={icon3} alt="Design consistency" className="principle-icon" />
                        <h4>DESIGN CONSISTENCY</h4>
                        <p>Uniform designs that reflect brand identity.</p>
                    </div>

                    <div className="principle-item">
                        <img src={icon4} alt="Trusted brand" className="principle-icon" />
                        <h4>TRUSTED BRAND</h4>
                        <p>Building long-term trust and cooperation.</p>
                    </div>
                </div>
            </section>

            {/* ================= PRODUCTS ================= */}
            <section className="products-section">
                <h3>Our Products</h3>
                <div className="products-grid">
                    {products.map((item) => (
                        <div className="product-card" key={item.id}>
                            <img src={item.image} alt={item.name} loading="lazy" />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </section>
            {/* ================= LIST PRODUCTS ================= */}
            <section className="list-products-section">
                <div className="products-page">
                    <h2 className="section-title">
                        {selectedType ? selectedType.toUpperCase() : "BEST-SELLING UNIFORMS"}
                    </h2>
                    <ProductGrid products={featuredProducts as Product[]} />
                </div>
            </section>


        </main>
    );
}

export default HomePage;
