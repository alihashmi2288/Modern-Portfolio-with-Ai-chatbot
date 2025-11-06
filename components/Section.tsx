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
        ? 'opacity-100 translate-y-0 scale-100 filter-none'
        : 'opacity-0 translate-y-8 scale-95 blur-sm';

    return (
        <section
            id={id}
            ref={combinedRef}
            className={`py-24 md:py-32 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${animationClasses} ${className}`}
        >
            {children}
        </section>
    );
});

Section.displayName = 'Section';

export default Section;