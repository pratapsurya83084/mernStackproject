import React from 'react'



const reviews = [
    {
      id: 1,
      profileImg: "https://via.placeholder.com/50",
      username: "John Doe",
      rating: 5,
      date: "2024-12-05",
      time: "10:30 AM",
      description: "This product is amazing! Highly recommend to everyone.",
    },
    {
      id: 2,
      profileImg: 
      "https://via.placeholder.com/50",
      username: "Jane Smith",
      rating: 4,
      date: "2024-12-04",
      time: "02:15 PM",
      description: "Good product, but the delivery took too long.",
    },
    {
      id: 3,
      profileImg: "https://via.placeholder.com/50",
      username: "Alex Brown",
      rating: 3,
      date: "2024-12-03",
      time: "08:45 AM",
      description: "Average product, met my expectations but nothing exceptional.",
    },
  ];
  
const UserReviews = () => {



    
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <i
              key={i}
              className={`bi ${i <= rating ? "bi-star-fill text-warning" : "bi-star"}`}
            ></i>
          );
        }
        return stars;
      };
    
      return (
        <div className="container mt-5">
      {/* <h1 className="text-center mb-4">Product Reviews</h1> */}
      {reviews.map((review) => (
        <div className="card mb-3 shadow-sm" key={review.id}>
          <div className="card-body d-flex align-items-start">
            <img
              src={review.profileImg}
              alt="profile"
              className="rounded-circle me-3"
              width="60"
              height="60"
            />
            <div>
              <h5 className="card-title">{review.username}</h5>
              <small className="text-muted">
                {review.date} at {review.time}
              </small>
              <div className="mt-2 mb-2">{renderStars(review.rating)}</div>
              <p className="card-text">{review.description}</p>
            </div>
          </div>
          
        </div>
        
      ))}

        
    </div>
      );
}

export default UserReviews
