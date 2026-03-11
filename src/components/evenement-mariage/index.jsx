'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './traiteur.css';

const EvenementMariageContent = () => {
    // Scroll animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const scrollElements = document.querySelectorAll('.fade-in-scroll');
        scrollElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Parallax effect (desktop only)
    useEffect(() => {
        // Check if device is mobile
        const isMobile = window.innerWidth <= 768;
        if (isMobile) return; // Skip parallax on mobile

        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const heroSection = document.querySelector('.hero-section');

                    if (heroSection && scrolled < window.innerHeight) {
                        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
                    }

                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="hero-section" id="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title fade-in">Événements & Mariage</h1>
                    <div className="hero-decorative-line"></div>
                </div>

                {/* Service Cards */}
                <div className="service-cards-container">
                    <div className="service-card fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="service-card-image">
                            <Image
                                src="/me/reception-mariage-traiteur.jpeg"
                                alt="Mariage & Outia"
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 968px) 50vw, 400px"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <h3 className="service-card-title">Mariage & Outia</h3>
                        <div className="service-decorative-line"></div>
                        <p className="service-card-description">
                            De la cérémonie de mariage à la réception de contrat de mariage
                        </p>
                    </div>

                    <div className="service-card fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="service-card-image">
                            <Image
                                src="/me/service-traiteur-cérémonie-mariage.jpeg"
                                alt="Fiançailles"
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 968px) 50vw, 400px"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <h3 className="service-card-title">Fiançailles</h3>
                        <div className="service-decorative-line"></div>
                        <p className="service-card-description">
                            Des assortiments raffinés pour sublimer vos réceptions.
                        </p>
                    </div>

                    <div className="service-card fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <div className="service-card-image">
                            <Image
                                src="/me/verines-mariages-tunisie.jpeg"
                                alt="Anniversaires & Naissance"
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 968px) 50vw, 400px"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <h3 className="service-card-title">Anniversaires & Naissance</h3>
                        <div className="service-decorative-line"></div>
                        <p className="service-card-description">Pièces montées et pâtisseries sur mesure.</p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="cta-section fade-in-up" style={{ animationDelay: '0.8s' }}>

                    <Link href="/contact-us" className="cta-button">
                        Contactez-nous
                    </Link>
                </div>
            </section>

            {/* Details Section */}
            <section className="details-section">
                {/* Buffets Raffinés - Image on left, text on right */}
                <div className="detail-block detail-block-reverse fade-in-scroll">
                    <div className="detail-image-content">
                        <Image
                            src="/me/reception-mariage-traiteur.jpeg"
                            alt="Mariage & Outia"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 968px) 100vw, 600px"
                            className="detail-image"
                        />
                    </div>
                    <div className="detail-text-content">
                        <h2 className="detail-title">Mariage & Outia</h2>
                        <div className="detail-decorative-line"></div>
                        <p className="detail-paragraph">
                            De la cérémonie de mariage à la réception de contrat de mariage (baladia), en passant par la Soirée jeune et l’outia, nous créons des instants d’exception. Nos délices sucré et salé, accompagnés de jus raffinés, subliment chaque moment. Notre qualité du service et notre équipe attentionnée assurent une organisation fluide, élégante et fidèle à vos traditions.
                        </p>

                    </div>
                </div>

                {/* Cadeaux Gourmands - Text on left, image on right (unchanged) */}
                <div className="detail-block fade-in-scroll">
                    <div className="detail-image-content">
                        <Image
                            src="/me/service-traiteur-cérémonie-mariage.jpeg"
                            alt="Cadeaux Gourmands"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 968px) 100vw, 600px"
                            className="detail-image"
                        />
                    </div>
                    <div className="detail-text-content">
                        <h2 className="detail-title">Fiançailles</h2>
                        <div className="detail-decorative-line"></div>
                        <p className="detail-paragraph">
                            Vos fiançailles méritent une réception à la hauteur de l’émotion partagée. Nous proposons des formules sucré et salé variées, des jus frais et une mise en scène soignée pour accueillir famille et proches. De l’accueil des invités à la coordination, notre qualité du service garantit une célébration harmonieuse et mémorable.
                        </p>

                    </div>

                </div>

                {/* Gâteaux de Prestige - Image on left, text on right */}
                <div className="detail-block detail-block-reverse fade-in-scroll">
                    <div className="detail-image-content">
                        <Image
                            src="/me/verines-mariages-tunisie.jpeg"
                            alt="Gâteaux de Prestige"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 968px) 100vw, 600px"
                            className="detail-image"
                        />
                    </div>
                    <div className="detail-text-content">
                        <h2 className="detail-title">Anniversaires & Naissance</h2>
                        <div className="detail-decorative-line"></div>
                        <p className="detail-paragraph">
                            Pour une naissance, une circoncision ou des anniversaires inoubliables, nous imaginons des réceptions chaleureuses et personnalisées. Buffets sucré et salé, jus savoureux et présentation élégante s’adaptent à votre thème. Notre qualité du service, portée par une
                        </p>

                    </div>
                </div>
            </section>
        </>
    );
};

export default EvenementMariageContent;
