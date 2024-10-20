import React from 'react';
import './StarRating.scss'; // Import the SCSS file for styling

interface StarRatingProps {
  rating: number; // Rating value from 0 to 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  // Render stars based on the rating value
  const renderStars = () => {
    const totalStars = 5;
    return (
      <div className="stars">
        {Array.from({ length: totalStars }, (_, index) => (
          <span key={index} className={index < rating ? 'star filled' : 'star'}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="star-rating">
      {renderStars()}
    </div>
  );
};

export default StarRating;
