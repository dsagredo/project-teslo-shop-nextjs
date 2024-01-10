import React from 'react';
import { TextT } from '@/interfaces/text.interface';
import { fonts } from '@/config/fonts';

export const Text = ({ title, subtitle, className }: TextT): JSX.Element => {
    return (
        <div className={`mt-3 ${className}`}>
            <h1
                className={`${fonts.className} antialiased text-4xl font-semibold my-7`}
            >
                {title}
            </h1>
            {subtitle && <h3 className="text-xl mb-5">{subtitle}</h3>}
        </div>
    );
};
