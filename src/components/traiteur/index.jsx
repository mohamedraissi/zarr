'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './traiteur.css';

const TraiteurContent = () => {
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
                    <h1 className="hero-title fade-in">Traiteur</h1>
                    <div className="hero-decorative-line"></div>
                </div>

                {/* Service Cards */}
                <div className="service-cards-container">
                    <div className="service-card fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="service-card-image">
                            <Image
                                src="/traiteur/services-traiteur-entreprises.jpeg"
                                alt="Professionnels"
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 968px) 50vw, 400px"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <h3 className="service-card-title">Professionnels</h3>
                        <div className="service-decorative-line"></div>
                        <p className="service-card-description">
                            Pour vos événements professionnels.
                        </p>
                    </div>

                    <div className="service-card fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <div className="service-card-image">
                            <Image
                                src="/traiteur/service-pause-café-tunis.jpeg"
                                alt="Événements particuliers"
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 968px) 50vw, 400px"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <h3 className="service-card-title">Événements particuliers</h3>
                        <div className="service-decorative-line"></div>
                        <p className="service-card-description">Pour vos événements particuliers.</p>
                    </div>

                    <div className="service-card fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <div className="service-card-image">
                            <Image
                                src="/traiteur/service-traiteur-entreprise.jpeg"
                                alt="Ambassades & Consulats"
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 968px) 50vw, 400px"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <h3 className="service-card-title">Ambassades & Consulats</h3>
                        <div className="service-decorative-line"></div>
                        <p className="service-card-description">Habituée aux standards d’une ambassade</p>
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
                            src="/traiteur/services-traiteur-entreprises.jpeg"
                            alt="Professionnels"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 968px) 100vw, 600px"
                            className="detail-image"
                        />
                    </div>
                    <div className="detail-text-content">
                        <h2 className="detail-title">Professionnels</h2>
                        <div className="detail-decorative-line"></div>
                        <p className="detail-paragraph">
                            Pour vos événements professionnels, la Pâtisserie Madame Zarrouk déploie son expertise en service traiteur avec une équipe de serveurs attentifs, aux petits soins de vos invités. De la Pause-café au déjeuner d’affaires, du diner corporate au team building, nos formules sucré et salé s’adaptent en buffet, service à table ou lunch-box, avec installation complète et réception maîtrisée pour refléter l’excellence de votre image.
                        </p>

                    </div>
                </div>

                {/* Cadeaux Gourmands - Text on left, image on right (unchanged) */}
                <div className="detail-block fade-in-scroll">
                    <div className="detail-image-content">
                        <Image
                            src="/traiteur/service-pause-café-tunis.jpeg"
                            alt="Événements particuliers"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 968px) 100vw, 600px"
                            className="detail-image"
                        />
                    </div>
                    <div className="detail-text-content">
                        <h2 className="detail-title">Événements particuliers</h2>
                        <div className="detail-decorative-line"></div>
                        <p className="detail-paragraph">
                            Mariages, réception familiale ou funérailles (fark), nous mettons notre savoir-faire et nos serveurs attentionnés au cœur de chaque moment. Du déjeuner convivial au diner élégant, en passant par une pause café gourmande, nos créations sucré et salé sont proposées en buffet ou lunch-box. Notre installation soignée et notre qualité de service assurent confort, discrétion et sérénité à vos invités.
                        </p>

                    </div>

                </div>

                {/* Gâteaux de Prestige - Image on left, text on right */}
                <div className="detail-block detail-block-reverse fade-in-scroll">
                    <div className="detail-image-content">
                        <Image
                            src="/traiteur/service-traiteur-entreprise.jpeg"
                            alt="Ambassades & Consulats"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 968px) 100vw, 600px"
                            className="detail-image"
                        />
                    </div>
                    <div className="detail-text-content">
                        <h2 className="detail-title">Ambassades & Consulats</h2>
                        <div className="detail-decorative-line"></div>
                        <p className="detail-paragraph">
                            Habituée aux standards d’une ambassade, la Pâtisserie Madame Zarrouk offre un service traiteur alliant rigueur protocolaire et raffinement. Pour un déjeuner officiel, un diner diplomatique, une réception institutionnelle ou un team building, nos équipes et serveurs veillent aux moindres détails. Service à table, Buffet, lunch-box, Pause-café sucré et salé, chaque installation est pensée pour honorer vos hôtes avec distinction.
                        </p>

                    </div>
                </div>
            </section>
        </>
    );
};

export default TraiteurContent;
