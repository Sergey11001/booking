import React from 'react';

import { Navigation, Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const SwiperPhotos = ({photos}) => {
    return (
        <Swiper
            className="mt-5"
            modules={[Navigation, Pagination, A11y]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={3}
        >
            {
                photos?.map(photo => (
                    <SwiperSlide key={photo}>
                        <div className="w-full h-80">
                            <img src={'http://localhost:3333/uploads/' + photo} className='w-full h-full object-cover' alt=""/>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default SwiperPhotos;