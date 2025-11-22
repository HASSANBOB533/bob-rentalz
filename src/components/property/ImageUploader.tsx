import React, { useState } from 'react';

interface ImageUploaderProps {
  images: string[];
  primaryIndex: number;
  onChange: (images: string[], primaryIndex: number) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  primaryIndex,
  onChange,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleAddImage = () => {
    const url = prompt('Enter image URL:');
    if (url && url.trim()) {
      onChange([...images, url.trim()], primaryIndex);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    let newPrimaryIndex = primaryIndex;

    // Adjust primary index if needed
    if (index === primaryIndex) {
      newPrimaryIndex = 0; // Set first image as primary
    } else if (index < primaryIndex) {
      newPrimaryIndex = primaryIndex - 1;
    }

    onChange(newImages, newPrimaryIndex);
  };

  const handleSetPrimary = (index: number) => {
    onChange(images, index);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    
    let newPrimaryIndex = primaryIndex;
    if (primaryIndex === index) {
      newPrimaryIndex = index - 1;
    } else if (primaryIndex === index - 1) {
      newPrimaryIndex = index;
    }

    onChange(newImages, newPrimaryIndex);
  };

  const handleMoveDown = (index: number) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];

    let newPrimaryIndex = primaryIndex;
    if (primaryIndex === index) {
      newPrimaryIndex = index + 1;
    } else if (primaryIndex === index + 1) {
      newPrimaryIndex = index;
    }

    onChange(newImages, newPrimaryIndex);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Property Images
        </label>
        <button
          type="button"
          onClick={handleAddImage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          + Add Image
        </button>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No images added yet</p>
          <button
            type="button"
            onClick={handleAddImage}
            className="mt-2 text-blue-600 hover:text-blue-700"
          >
            Add your first image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative border-2 rounded-lg overflow-hidden ${
                index === primaryIndex ? 'border-blue-500' : 'border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`Property ${index + 1}`}
                className="w-full h-48 object-cover"
              />
              
              {index === primaryIndex && (
                <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  Primary
                </div>
              )}

              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1 bg-white rounded shadow hover:bg-gray-100 disabled:opacity-50"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === images.length - 1}
                  className="p-1 bg-white rounded shadow hover:bg-gray-100 disabled:opacity-50"
                  title="Move down"
                >
                  ↓
                </button>
              </div>

              <div className="p-2 bg-white flex gap-2">
                {index !== primaryIndex && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(index)}
                    className="flex-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                  >
                    Set as Primary
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="flex-1 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">
        {images.length} image{images.length !== 1 ? 's' : ''} added
        {images.length > 0 && ` • Primary: Image ${primaryIndex + 1}`}
      </p>
    </div>
  );
};
