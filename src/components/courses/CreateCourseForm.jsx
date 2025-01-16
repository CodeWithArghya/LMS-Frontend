import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '../../hooks/useCourses';
import { Upload } from 'lucide-react';

export default function CreateCourseForm() {
  const navigate = useNavigate();
  const { addCourse } = useCourses();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: '',
    duration: '',
    prerequisites: '',
    learningOutcomes: '',
    thumbnail: null,
    curriculum: ['']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse(formData);
    navigate('/instructor/courses');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCurriculumChange = (index, value) => {
    const newCurriculum = [...formData.curriculum];
    newCurriculum[index] = value;
    setFormData(prev => ({
      ...prev,
      curriculum: newCurriculum
    }));
  };

  const addCurriculumItem = () => {
    setFormData(prev => ({
      ...prev,
      curriculum: [...prev.curriculum, '']
    }));
  };

  const removeCurriculumItem = (index) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-background-secondary p-6 rounded-lg">
      {/* Basic Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Basic Information</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
            placeholder="Enter course title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
            placeholder="Enter course description"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
              placeholder="e.g., Web Development"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Difficulty Level
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
              required
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Price (USD)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
              placeholder="Enter price"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Duration (hours)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
              placeholder="Enter duration"
              min="1"
              required
            />
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="space-y-4 pt-6">
        <h2 className="text-xl font-semibold text-white">Course Details</h2>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Prerequisites
          </label>
          <textarea
            name="prerequisites"
            value={formData.prerequisites}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
            placeholder="Enter course prerequisites"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Learning Outcomes
          </label>
          <textarea
            name="learningOutcomes"
            value={formData.learningOutcomes}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
            placeholder="What will students learn?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Course Thumbnail
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-400">
                <label className="relative cursor-pointer rounded-md font-medium text-violet-400 hover:text-violet-300">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="thumbnail"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      thumbnail: e.target.files[0]
                    }))}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="space-y-4 pt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Curriculum</h2>
          <button
            type="button"
            onClick={addCurriculumItem}
            className="text-violet-400 hover:text-violet-300 text-sm"
          >
            + Add Section
          </button>
        </div>

        {formData.curriculum.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => handleCurriculumChange(index, e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white"
              placeholder={`Section ${index + 1}`}
              required
            />
            {formData.curriculum.length > 1 && (
              <button
                type="button"
                onClick={() => removeCurriculumItem(index)}
                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg transition-colors font-semibold"
        >
          Create Course
        </button>
      </div>
    </form>
  );
}