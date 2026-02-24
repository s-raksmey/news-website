'use client';

import { HeroSectionProps } from '../../../types/layout';
import Image from 'next/image';

/**
 * Hero Section Component - Flexible hero section for different layout types
 */
export default function HeroSection({ 
  title, 
  subtitle, 
  backgroundImage, 
  style = 'gradient',
  alignment = 'center',
  height = 'lg',
  overlay = false,
  ctaButton
}: HeroSectionProps) {
  // Style mappings
  const bgClasses = {
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
    image: backgroundImage ? 'relative' : 'bg-gray-800',
    solid: 'bg-blue-600',
    video: 'relative bg-gray-900'
  };

  const heightClasses = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-24',
    xl: 'py-24 md:py-32',
    full: 'min-h-screen flex items-center'
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const ctaButtonStyles = {
    primary: 'bg-white text-blue-600 hover:bg-gray-100',
    secondary: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-blue-600'
  };

  return (
    <section className={`relative ${bgClasses[style]} ${heightClasses[height]} text-white overflow-hidden`}>
      {/* Background Image */}
      {backgroundImage && style === 'image' && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
            priority
          />
          {overlay && (
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          )}
        </>
      )}

      {/* Content */}
      <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${alignmentClasses[alignment]}`}>
        <div className={height === 'full' ? 'py-20' : ''}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}

          {ctaButton && (
            <div className="mt-8">
              <a
                href={ctaButton.href}
                className={`inline-block px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-200 ${
                  ctaButtonStyles[ctaButton.style || 'primary']
                }`}
              >
                {ctaButton.text}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      {style === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black opacity-20" />
      )}
    </section>
  );
}
