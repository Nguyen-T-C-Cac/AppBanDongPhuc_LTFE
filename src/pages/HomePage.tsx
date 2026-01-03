import React from "react";
import "../styles/home.css";

/* ABOUT IMAGES */
import bgAbout from "../assets/images/ImageHome/indexdp1.jpg";
import imgLeft from "../assets/images/ImageHome/indexdp3.jpg";
import imgRight from "../assets/images/ImageHome/indexdp2.jpg";

/* REASON */
import imgReason from "../assets/images/ImageHome/indexdp4.jpg";
import imgReason2 from "../assets/images/ImageHome/indexdp5.jpg";

/* PRODUCTS */
import p1 from "../assets/images/ImageHome/aothundp.jpg";
import p2 from "../assets/images/ImageHome/somidp.jpg";
import p3 from "../assets/images/ImageHome/aokhoatdp.jpg";
import p4 from "../assets/images/ImageHome/laodongdp.jpg";
import p5 from "../assets/images/ImageHome/spadp.jpg";
import p6 from "../assets/images/ImageHome/hocsinhdp.jpg";

const products = [
    { id: 1, name: "Company uniform shirt", image: p1 },
    { id: 2, name: "Uniform T-shirt", image: p2 },
    { id: 3, name: "Uniform jacket", image: p3 },
    { id: 4, name: "Workwear", image: p4 },
    { id: 5, name: "Spa uniform", image: p5 },
    { id: 6, name: "School uniforms", image: p6 },
];

function HomePage() {
    return (
        <main className="home-container">

            {/* ================= ABOUT ================= */}
            <section
                className="about-section"
                style={{ backgroundImage: `url(${bgAbout})` }}
            >
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

                <div className="principles-list">
                    <div className="principle-item">
                        <h4>ON-TIME DELIVERY</h4>
                        <p>Always deliver products on schedule.</p>
                    </div>

                    <div className="principle-item">
                        <h4>DEDICATED CONSULTATION</h4>
                        <p>Professional support for customers.</p>
                    </div>

                    <div className="principle-item">
                        <h4>DESIGN CONSISTENCY</h4>
                        <p>Uniform designs that reflect brand identity.</p>
                    </div>

                    <div className="principle-item">
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

        </main>
    );
}

export default HomePage;
