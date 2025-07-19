import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '0px 0px 200px 0px' // Start loading images 200px before they enter the viewport
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, []);

    return (
        <img
            ref={imgRef}
            src={isVisible ? src : ''}
            alt={alt}
            className={className}
            loading="lazy" // Keep native lazy loading as a fallback
        />
    );
};

export default LazyImage;
