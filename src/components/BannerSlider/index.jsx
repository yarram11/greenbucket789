import Link from 'next/link'; // Ensure you have this import for Link
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/pagination'; // Import pagination styles

export const BannerSlider = () => {
  // Common slide content
  const SlideContent = ({ backgroundImage }) => (
    <div
      className="item w-full relative flex flex-col"
      style={{ background: `url(${backgroundImage}) center/cover`, height: '100vh' }}
    >
      <div className="info flex flex-col items-start justify-center pl-10 pr-10 h-full">
        <h2
          className="banner-title mb-4"
          style={{
            fontFamily: 'Playfair Display, serif',
            lineHeight: '1',
            fontSize: '3rem',
            marginBottom: '1rem',
            marginTop: '0',
            textAlign: 'left',
            color: 'white',
            position: 'absolute',
            top: '50%',
            left: '10%',
            transform: 'translateY(-50%)',
          }}
        >
          Freshness Sealed<br />in Every Bucket
        </h2>
        <div className="flex space-x-4 mb-4" style={{ position: 'absolute', left: '10%', top: '60%' }}>
          <Link
            href="#reserve-table"
            className="link-button"
            style={{
              backgroundColor: 'transparent',
              border: '2px solid green',
              color: 'white',
              padding: '10px 20px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'green';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
          >
            Book a Table
          </Link>
          <Link
            href="/know-more"
            className="link-button"
            style={{
              backgroundColor: 'transparent',
              border: '2px solid green',
              color: 'white',
              padding: '10px 20px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'green';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
          >
            Know More
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="banner-slider-container w-full h-screen">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="banner-slider w-full h-full"
      >
        {["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"].map((image, index) => (
          <SwiperSlide key={index}>
            <SlideContent backgroundImage={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
