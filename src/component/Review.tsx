import React from 'react';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

const Reviews = () => {
  const sortOptions = [
    { label: 'Highest to Lowest Rating', value: 'high-low' },
    { label: 'Lowest to Highest Rating', value: 'low-high' },
    { label: 'Most Recent', value: 'recent' },
    { label: 'With Photos', value: 'photos' }
  ];

  const reviews = [
    {
      id: 1,
      name: 'ElizabethRBklyn',
      verified: true,
      rating: 5,
      title: 'Warm and very attractive on',
      body: 'Got this to keep my husband warm on those chilly late fall days. He loves it as it not only is pretty warm but he looks good in it and he knows it.',
      date: '14 days ago',
      height: `5'9 - 5'11`,
      weight: '161 - 180 lb',
      bodyType: 'Petite',
      sizePurchased: 'L',
      usualSize: 'L',
      photo: 'https://example.com/review-photo1.jpg'
    },
    {
      id: 2,
      name: 'Anonymous',
      verified: true,
      rating: 5,
      title: 'Super comfy',
      body: 'Great quality, warm and super comfy. Got the XL cuz I have a large back and it fits perfect. It does run a bit oversized which is good.',
      date: '14 days ago',
      height: `5'9 - 5'11`,
      weight: '161 - 180 lb',
      bodyType: 'Petite',
      sizePurchased: 'L',
      usualSize: 'L'
    }
  ];

  return (
    <div className="p-3 sm:p-4 md:px-6 lg:px-7 w-full max-w-7xl mx-auto">
      <div className="flex flex-column md:flex-row justify-content-between align-items-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-900 mb-3 md:mb-0">Customer Reviews</h2>
        <Button label="Write a Review" icon="pi pi-pencil" className="p-button-outlined p-button-secondary" />
      </div>

      <div className="surface-0 border-round shadow-2 p-4 mb-5">
        <div className="flex flex-column md:flex-row gap-6">
          <div className="flex flex-column align-items-center md:align-items-start">
            <span className="text-4xl md:text-5xl font-bold mb-2">5.0</span>
            <Rating value={5} readOnly cancel={false} className="mb-2" />
            <span className="text-600 font-semibold">Overall Rating</span>
          </div>

          <div className="flex-1">
            <span className="font-semibold mb-2 block">Size & Fit</span>
            <span className="text-sm font-medium block mb-2">Runs slightly large</span>
            <div className="flex align-items-center gap-3 mb-3">
              <span className="text-xs text-500 font-semibold">Runs small</span>
              <div className="w-full h-2 border-round bg-gray-200 relative">
                <div className="h-2 w-3 border-round bg-primary absolute left-0" style={{ width: '25%' }}></div>
              </div>
              <span className="text-xs text-500 font-semibold">Runs large</span>
            </div>

            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="flex align-items-center gap-2 mb-2">
                <span className="text-sm font-medium" style={{ width: '30px' }}>{star}★</span>
                <div className="flex-1 h-2 border-round bg-gray-200">
                  <div className="h-2 border-round bg-primary" style={{ width: star === 5 ? '100%' : '0%' }}></div>
                </div>
                <span className="text-sm text-600" style={{ width: '30px' }}>{star === 5 ? 2 : 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-column sm:flex-row justify-content-between align-items-start sm:align-items-center gap-3 mb-4">
        <div className="flex gap-2">
          <Button label="All Reviews" className="p-button-text font-medium" />
          <Button label="With Photos" className="p-button-text font-medium" />
        </div>
        <Dropdown
          value={sortOptions[0]}
          options={sortOptions}
          optionLabel="label"
          className="w-full sm:w-20rem"
          placeholder="Sort by"
        />
      </div>

      <div className="flex flex-column gap-4">
        {reviews.map(review => (
          <div key={review.id} className="surface-0 p-4 border-round shadow-2">
            <div className="flex flex-column sm:flex-row justify-content-between align-items-start mb-2">
              <div>
                <div className="flex align-items-center gap-2">
                  <span className="font-bold text-900">{review.name}</span>
                  {review.verified && <span className="text-sm text-primary"><i className="pi pi-check-circle"></i> Verified</span>}
                </div>
                <div className="flex align-items-center gap-2 mt-1">
                  <Rating value={review.rating} readOnly cancel={false} stars={5} className="text-sm" />
                  <span className="text-sm text-500">{review.date}</span>
                </div>
              </div>
              {review.photo && (
                <Button icon="pi pi-image" className="p-button-text text-500 mt-2 sm:mt-0" tooltip="View photo" tooltipOptions={{ position: 'left' }} />
              )}
            </div>

            <div className="mb-2 font-semibold text-lg">{review.title}</div>
            <p className="text-700 mb-3">{review.body}</p>

            <Divider className="my-3" />

            <div className="grid grid-nogutter md:grid-cols-2 gap-3 text-sm">
              <div className="flex gap-2"><span className="text-500">Height:</span> <span className="font-medium">{review.height}</span></div>
              <div className="flex gap-2"><span className="text-500">Weight:</span> <span className="font-medium">{review.weight}</span></div>
              <div className="flex gap-2"><span className="text-500">Body Type:</span> <span className="font-medium">{review.bodyType}</span></div>
              <div className="flex gap-2"><span className="text-500">Size Purchased:</span> <span className="font-medium">{review.sizePurchased}</span></div>
              <div className="flex gap-2"><span className="text-500">Usual Size:</span> <span className="font-medium">{review.usualSize}</span></div>
            </div>

            <div className="flex flex-wrap gap-3 mt-3">
              <Button label="Helpful" icon="pi pi-thumbs-up" className="p-button-text text-sm" />
              <Button label="Report" icon="pi pi-flag" className="p-button-text text-sm" />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <Button label="Load More Reviews" className="p-button-outlined" />
      </div>
    </div>
  );
};

export default Reviews;