import { useState } from 'react';
import { Camera, Mail, Phone, MapPin, X, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function AgentProfilePage() {
  const [profile, setProfile] = useState({
    name: "Sarah Anderson",
    email: "sarah.anderson@bob-rentalz.com",
    phone: "+20 100 123 4567",
    bio: "Specializing in New Cairo and Sheikh Zayed areas. Verified BOB® agent with 5+ years experience in luxury rentals and property management.",
    specialization: ["New Cairo", "Sheikh Zayed", "Madinaty"],
    avatar: "https://i.pravatar.cc/150?img=47",
    yearsExperience: "5+",
    propertiesManaged: 12,
    language: ["English", "Arabic"]
  });

  const [newArea, setNewArea] = useState('');

  const handleSaveChanges = () => {
    // Simulate save operation
    toast.success('Profile updated successfully!');
  };

  const handlePhotoChange = () => {
    // Simulate photo upload
    toast.info('Photo upload coming soon!');
  };

  const handleAddSpecialization = () => {
    if (newArea.trim() && !profile.specialization.includes(newArea.trim())) {
      setProfile({
        ...profile,
        specialization: [...profile.specialization, newArea.trim()]
      });
      setNewArea('');
      toast.success(`Added "${newArea}" to specialization areas`);
    }
  };

  const handleRemoveSpecialization = (areaToRemove: string) => {
    setProfile({
      ...profile,
      specialization: profile.specialization.filter(area => area !== areaToRemove)
    });
    toast.success(`Removed "${areaToRemove}" from specialization areas`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSpecialization();
    }
  };

  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* BACK TO DASHBOARD BUTTON */}
      <button
        onClick={() => navigate('/agent/dashboard')}
        className="flex items-center gap-2 text-[#0E56A4] hover:text-[#093B74] transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      {/* 1️⃣ PAGE HEADER */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-[#0E56A4]">Profile Settings</h1>
        <p className="text-gray-600">Update your personal information and preferences</p>
      </div>

      {/* 2️⃣ MAIN LAYOUT - TWO COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN - PROFILE CARD */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center space-y-4">
            
            {/* Profile Photo */}
            <div className="relative">
              <img
                src={profile.avatar}
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-100"
                alt="Profile"
              />
              <div className="absolute bottom-0 right-0 bg-[#0E56A4] p-2 rounded-full">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Upload Photo Button */}
            <button
              onClick={handlePhotoChange}
              className="px-4 py-2 text-sm border border-[#0E56A4] text-[#0E56A4] rounded-lg hover:bg-[#0E56A4]/10 transition font-medium"
            >
              Change Photo
            </button>

            {/* Agent Info */}
            <div className="text-center space-y-1 pt-2">
              <h2 className="text-xl font-semibold text-[#0E56A4]">{profile.name}</h2>
              <p className="text-sm text-gray-500">BOB® Verified Agent</p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Active
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="w-full pt-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Experience</span>
                <span className="font-medium text-gray-800">{profile.yearsExperience} years</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Properties Managed</span>
                <span className="font-medium text-gray-800">{profile.propertiesManaged}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Languages</span>
                <span className="font-medium text-gray-800">{profile.language.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - EDITABLE FORM */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-8">
            
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#0E56A4] mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
                      type="email"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
                      type="tel"
                      placeholder="+20 100 123 4567"
                    />
                  </div>
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Years of Experience
                  </label>
                  <input
                    value={profile.yearsExperience}
                    onChange={(e) => setProfile({ ...profile, yearsExperience: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
                    type="text"
                    placeholder="e.g., 5+"
                  />
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#0E56A4] mb-4">Professional Bio</h3>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                About You
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent resize-none"
                rows={5}
                placeholder="Tell clients about your experience, specialization, and expertise..."
              />
              <p className="text-xs text-gray-400 mt-1">
                {profile.bio.length} / 500 characters
              </p>
            </div>

            {/* Areas of Specialization */}
            <div>
              <h3 className="text-lg font-semibold text-[#0E56A4] mb-4">Areas of Specialization</h3>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Locations You Specialize In
              </label>

              {/* Current Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {profile.specialization.map((area, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full flex items-center gap-2"
                  >
                    {area}
                    <button
                      onClick={() => handleRemoveSpecialization(area)}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add New Area Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add new area (e.g., Maadi, Heliopolis)"
                  className="flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0E56A4] focus:border-transparent"
                />
                <button
                  onClick={handleAddSpecialization}
                  className="px-4 py-2 bg-[#0E56A4] text-white rounded-lg text-sm hover:bg-[#0c447f] transition font-medium"
                >
                  Add
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Press Enter or click Add to include a new specialization area
              </p>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-lg font-semibold text-[#0E56A4] mb-4">Languages</h3>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Languages You Speak
              </label>
              <div className="flex flex-wrap gap-2">
                {profile.language.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Contact support to update your languages
              </p>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={handleSaveChanges}
                className="w-full py-3 bg-[#0E56A4] text-white rounded-lg font-medium hover:bg-[#0c447f] transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}