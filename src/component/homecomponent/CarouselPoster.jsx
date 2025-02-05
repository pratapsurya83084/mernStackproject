import React from 'react';

const CarouselPoster = () => {
  return (
    <div>
      {/* Bootstrap Carousel Component */}
      <div
        id="carouselExampleAutoplay"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/carouselSlide1.avif"
              className="d-block w-100 img-fluid"
              alt="Slide 1"
              style={{
                objectFit: 'cover', // Ensure images are cropped to cover the area
                height: 'auto',      // Maintain aspect ratio
                maxHeight: '600px',  // Set max height for the image
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/slidCarousel2.avif"
              className="d-block w-100 img-fluid"
              alt="Slide 2"
              style={{
                objectFit: 'cover',
                height: 'auto',
                maxHeight: '600px',
              }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/thirdsSlideCarousel.avif"
              className="d-block w-100 img-fluid"
              alt="Slide 3"
              style={{
                objectFit: 'cover',
                height: 'auto',
                maxHeight: '600px',
              }}
            />
          </div>
        </div>
        {/* Previous Button */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplay"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        {/* Next Button */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplay"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default CarouselPoster;
