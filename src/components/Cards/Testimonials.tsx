import React from 'react';

const Testimonials = ({ testimonials }: { testimonials: any[] }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">
        How learners like you are achieving their goals
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <p className="italic mb-4">"{testimonial.text}"</p>
            <p className="font-semibold">{testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
