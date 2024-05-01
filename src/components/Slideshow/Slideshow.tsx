'use client';

import { CSSProperties, useState } from 'react';
import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Autoplay,
    FreeMode,
    Navigation,
    Pagination,
    Thumbs,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './Slideshow.css';
import { ProductImage } from '@/ui';

interface SlideshowT {
    images: string[];
    title: string;
}

export const Slideshow = ({ images, title }: SlideshowT): JSX.Element => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <>
            <div className="block md:hidden">
                <Swiper
                    style={{
                        width: '100vw',
                        height: '500px',
                    }}
                    pagination
                    autoplay={{
                        delay: 2500,
                    }}
                    modules={[FreeMode, Autoplay, Pagination]}
                    className="mySwiper2"
                >
                    {images.map(
                        (image: string): JSX.Element => (
                            <SwiperSlide key={image}>
                                <ProductImage
                                    width={600}
                                    height={500}
                                    src={image}
                                    alt={title}
                                    className="object-fill"
                                />
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
            </div>
            <div className="hidden md:block">
                <Swiper
                    style={
                        {
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                        } as CSSProperties
                    }
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{
                        swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed
                                ? thumbsSwiper
                                : null,
                    }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    {images.map(
                        (image: string): JSX.Element => (
                            <SwiperSlide key={image}>
                                <ProductImage
                                    width={1024}
                                    height={800}
                                    src={image}
                                    alt={title}
                                    className="rounded-lg object-fill"
                                />
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    {images.map(
                        (image: string): JSX.Element => (
                            <SwiperSlide key={image}>
                                <ProductImage
                                    width={300}
                                    height={300}
                                    src={image}
                                    alt={title}
                                    className="rounded-lg object-fill"
                                />
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
            </div>
        </>
    );
};
