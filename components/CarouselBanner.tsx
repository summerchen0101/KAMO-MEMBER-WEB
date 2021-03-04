import { Banner } from '@/lib/types'
import { Image } from '@chakra-ui/image'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React from 'react'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

SwiperCore.use([Pagination, Autoplay])

const CarouselBanner: React.FC<{ banners: Banner[] }> = ({ banners }) => {
  const router = useRouter()
  return (
    <div className="main-banner">
      <Swiper
        className="swiper-container"
        spaceBetween={0}
        width={1920}
        height={360}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        speed={500}
        loop={true}
        pagination={{ clickable: true }}
        updateOnWindowResize={true}
        centeredSlides={true}
      >
        {banners.map((t, i) => (
          <SwiperSlide className="swiper-slide" key={i}>
            {t.url ? (
              <Link href={t.url}>
                <a target={t.is_blank ? '_blank' : '_self'}>
                  <Image src={t.img} className="d-block" />
                </a>
              </Link>
            ) : (
              <Image src={t.img} />
            )}

            {/* <img src="/img/banner_1.jpg" /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CarouselBanner
