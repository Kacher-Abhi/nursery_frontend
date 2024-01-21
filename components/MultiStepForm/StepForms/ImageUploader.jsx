import TextInput from '@/components/FormInputs/TextInput';
import React, { useState } from 'react';

const ImageUploader = ({ onImageChange, label  }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      onImageChange(file);
      setError('');
    } else {
      setError('Please select an image.');
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2 ">{label || 'Logo'}</label>
        <input
          name='image'
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
    </div>
  );
};

export default ImageUploader;
