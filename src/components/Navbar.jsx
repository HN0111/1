import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { creators } from '../data/creators';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileCreatorsOpen, setIsMobileCreatorsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCreatorClick = (id) => {
        navigate(`/creator/${id}`);
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
    };

    const handleLinkClick = (e, link) => {
        if (link.onClick) {
            link.onClick(e);
        }
        setIsMobileMenuOpen(false);
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    const navLinks = [
        { name: 'Home', href: '/', onClick: handleHomeClick },
        { name: 'About', href: '/#about' },
        {
            name: 'Creators',
            href: '/#creators',
            hasDropdown: true
        },
        { name: 'Visit', href: '/#visit' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 text-[#333333] ${isScrolled ? 'bg-[#F4F5F0]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="/" onClick={handleHomeClick} className="text-xl font-bold tracking-widest">
                    ART&INNOVATION
                </a>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 items-center">
                    {navLinks.map((link) => (
                        <li key={link.name} className="relative group">
                            {link.hasDropdown ? (
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    <a
                                        href={link.href}
                                        className="text-sm font-medium hover:text-[#333333]/70 transition-colors cursor-pointer flex items-center gap-1"
                                    >
                                        {link.name}
                                        <span className="text-xs">▼</span>
                                    </a>

                                    {/* Dropdown Menu */}
                                    <div className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-lg shadow-lg py-2 transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                        {creators.map((creator) => (
                                            <button
                                                key={creator.id}
                                                onClick={() => handleCreatorClick(creator.id)}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-[#333333]/10 hover:text-[#333333] transition-colors"
                                            >
                                                {creator.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <a
                                    href={link.href}
                                    className="text-sm font-medium hover:text-[#333333]/70 transition-colors"
                                    onClick={link.onClick}
                                >
                                    {link.name}
                                </a>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl z-50 relative"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`md:hidden fixed inset-0 bg-[#F4F5F0]/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    <ul className="flex flex-col space-y-6 text-center">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                {link.hasDropdown ? (
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={() => setIsMobileCreatorsOpen(!isMobileCreatorsOpen)}
                                            className="text-2xl font-bold hover:text-white transition-colors flex items-center gap-2"
                                        >
                                            {link.name}
                                            <span className={`text-sm transition-transform duration-200 ${isMobileCreatorsOpen ? 'rotate-180' : ''}`}>▼</span>
                                        </button>

                                        {/* Mobile Creators Dropdown */}
                                        <div className={`overflow-hidden transition-all duration-300 ${isMobileCreatorsOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="flex flex-col space-y-3 bg-white/20 rounded-xl p-4">
                                                {creators.map((creator) => (
                                                    <button
                                                        key={creator.id}
                                                        onClick={() => handleCreatorClick(creator.id)}
                                                        className="text-lg text-[#333333] hover:text-white transition-colors"
                                                    >
                                                        {creator.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <a
                                        href={link.href}
                                        className="text-2xl font-bold hover:text-white transition-colors"
                                        onClick={(e) => handleLinkClick(e, link)}
                                    >
                                        {link.name}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
