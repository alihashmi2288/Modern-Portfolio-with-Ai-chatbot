'use client';

import React, { useRef, useEffect, useState, forwardRef } from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(({ children, className = '', id }, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const targetRef = (ref && 'current' in ref ? ref.current : internalRef.current) as HTMLElement;
        if (!targetRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                rootMargin: '0px 0px -150px 0px', // Trigger animation a bit later
            }
        );

        observer.observe(targetRef);

        return () => {
            observer.disconnect();
        };
    }, [ref]);
    
    const combinedRef = (el: HTMLElement | null) => {
        if (typeof ref === 'function') {
            ref(el);
        } else if (ref) {
            ref.current = el;
        }
        (internalRef as React.MutableRefObject<HTMLElement | null>).current = el;
    };

    const animationClasses = isVisible
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-4';

    return (
        <section
            id={id}
            ref={combinedRef}
            className={`py-24 md:py-32 transition-[opacity,transform] duration-400 ease-out-strong ${animationClasses} ${className}`}
        >
            {children}
        </section>
    );
});

Section.displayName = 'Section';

export default Section;
