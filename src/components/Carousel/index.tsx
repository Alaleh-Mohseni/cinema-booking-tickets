import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Aparat from '../../assets/images/aparatchi.jpg';
import Bibadan from '../../assets/images/bi-badan.jpg';
import Temsah from '../../assets/images/temsahe-khoni.jpg';
import Gorbe from '../../assets/images/sal-e-gorbe.jpg';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';


function Carousel() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper rounded-3xl"
                style={{
                    '--swiper-navigation-color': '#ffffff',
                    '--swiper-pagination-color': '#ffffff',
                    '--swiper-navigation-size': '25px',
                }}
            >
                <SwiperSlide>
                    <img src={Temsah} alt="Temsah e khoni banner" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Gorbe} alt="Sale gorbe banner" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Bibadan} alt="Bibadan banner" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Aparat} alt="Aparatchi banner" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}

export default Carousel