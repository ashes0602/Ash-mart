"use client";

import { useState, useEffect } from 'react';

export default function Footer() {
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const clientHeight = window.innerHeight;
            
            // Show footer when user scrolls to bottom (with 100px threshold)
            if (scrollHeight - scrollTop - clientHeight < 100) {
                setShowFooter(true);
            } else {
                setShowFooter(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer className={`fixed bottom-0 w-full bg-green-900 text-white py-6 mt-12 z-50 transition-all duration-500 ${
            showFooter ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}>
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <p>© 2026 TinFood. All rights reserved.</p>
                <div className="flex gap-4 mt-3 md:mt-0">
                    <a href="#" className="hover:text-green-400">Privacy Policy</a>
                    <a href="#" className="hover:text-green-400">Terms</a>
                    <a href="#" className="hover:text-green-400">Contact</a>
                </div>
            </div>
        </footer>
    );
}