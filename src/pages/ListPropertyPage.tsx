import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { agents } from '../data/mockData';
import { topLevelRegions } from '../data/locationData';
import { Check, Upload } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ListPropertyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const allAmenities = ['Garden', 'Parking', 'Security', 'Pool', 'Gym', 'Balcony', 'Elevator', 'Central AC', 'Beach Access', 'Terrace'];

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, this would submit to a backend
    setSubmitted(true);
    toast.success('Property submitted successfully!');
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-[#E5E7EB] max-w-2xl mx-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="mb-4">Property Submitted Successfully!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for listing your property with BOB Rentalz. Our team will review your submission and contact you within 24-48 hours.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
              }}
              variant="outline"
            >
              List Another Property
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
            >
              Go to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="mb-4">List Your Property</h1>
            <p className="text-gray-600">
              Fill out the form below to list your property with BOB Rentalz
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      s <= step
                        ? 'bg-[#D4AF37] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        s < step ? 'bg-[#D4AF37]' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">Basic Info</span>
              <span className="text-sm text-gray-600">Details</span>
              <span className="text-sm text-gray-600">Features</span>
              <span className="text-sm text-gray-600">Media</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E7EB]">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="mb-6">Basic Information</h3>
                  
                  <div>
                    <label className="block font-medium mb-2">Property Title *</label>
                    <Input
                      required
                      placeholder="e.g., Modern Villa in New Cairo"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium mb-2">Location *</label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {topLevelRegions.map((region) => (
                            <SelectItem key={region.id} value={region.name}>
                              {region.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block font-medium mb-2">Monthly Rent (EGP) *</label>
                      <Input
                        type="number"
                        required
                        placeholder="e.g., 35000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Region/District *</label>
                    <Input
                      required
                      placeholder="e.g., Fifth Settlement"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="mb-6">Property Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block font-medium mb-2">Bedrooms *</label>
                      <Input
                        type="number"
                        required
                        min="1"
                        placeholder="e.g., 3"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-2">Bathrooms *</label>
                      <Input
                        type="number"
                        required
                        min="1"
                        placeholder="e.g., 2"
                      />
                    </div>

                    <div>
                      <label className="block font-medium mb-2">Area (m²) *</label>
                      <Input
                        type="number"
                        required
                        placeholder="e.g., 200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium mb-2">Furnishing *</label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select furnishing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="furnished">Furnished</SelectItem>
                          <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
                          <SelectItem value="unfurnished">Unfurnished</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block font-medium mb-2">Status *</label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="rented">Rented</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Lease Term *</label>
                    <Input
                      required
                      placeholder="e.g., 12 months minimum"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Description *</label>
                    <Textarea
                      required
                      rows={6}
                      placeholder="Describe your property in detail..."
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Features */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="mb-6">Features & Amenities</h3>

                  <div>
                    <label className="block font-medium mb-3">Select Amenities</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {allAmenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2">
                          <Checkbox
                            id={`amenity-${amenity}`}
                            checked={selectedAmenities.includes(amenity)}
                            onCheckedChange={() => handleAmenityToggle(amenity)}
                          />
                          <label htmlFor={`amenity-${amenity}`} className="text-sm cursor-pointer">
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Assigned Agent *</label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select agent" />
                      </SelectTrigger>
                      <SelectContent>
                        {agents.map((agent) => (
                          <SelectItem key={agent.id} value={agent.id}>
                            {agent.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 4: Media */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="mb-6">Property Media</h3>

                  <div>
                    <label className="block font-medium mb-2">Property Images *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-600 mb-2">Click to upload property images</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB each (max 10 images)</p>
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-2">Property Brochure (Optional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Click to upload PDF brochure</p>
                      <Input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-[#E5E7EB]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={step === 1}
                >
                  Previous
                </Button>
                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                  >
                    Submit Property
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}