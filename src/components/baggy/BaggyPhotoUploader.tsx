import React, { useState, useRef } from 'react';
import { BaggyPhoto } from '../../data/baggyPhotoTypes';

interface BaggyPhotoUploaderProps {
  onUpload: (photos: BaggyPhoto[]) => void;
  collections: string[];
  allowNewCollections?: boolean;
}

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

const BaggyPhotoUploader: React.FC<BaggyPhotoUploaderProps> = ({
  onUpload,
  collections,
  allowNewCollections = true,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // Photo metadata and credits
  const [title, setTitle] = useState('');
  const [collection, setCollection] = useState(collections.length > 0 ? collections[0] : '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Today's date in YYYY-MM-DD format
  
  // Credits
  const [photographer, setPhotographer] = useState('');
  const [agency, setAgency] = useState('');
  const [modelInput, setModelInput] = useState('');
  const [models, setModels] = useState<string[]>([]);
  const [stylist, setStylist] = useState('');
  const [makeup, setMakeup] = useState('');
  const [hair, setHair] = useState('');
  const [location, setLocation] = useState('');
  
  // Tags
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  // New collection input
  const [newCollection, setNewCollection] = useState('');
  const [showNewCollectionInput, setShowNewCollectionInput] = useState(false);
  
  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const handleAddModel = () => {
    if (modelInput.trim() && !models.includes(modelInput.trim())) {
      setModels(prev => [...prev, modelInput.trim()]);
      setModelInput('');
    }
  };

  const handleRemoveModel = (model: string) => {
    setModels(prev => prev.filter(m => m !== model));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags(prev => [...prev, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleAddCollection = () => {
    if (newCollection.trim()) {
      setCollection(newCollection.trim());
      setNewCollection('');
      setShowNewCollectionInput(false);
    }
  };

  const resetForm = () => {
    setSelectedFiles([]);
    setTitle('');
    setCollection(collections.length > 0 ? collections[0] : '');
    setDate(new Date().toISOString().split('T')[0]);
    setPhotographer('');
    setAgency('');
    setModelInput('');
    setModels([]);
    setStylist('');
    setMakeup('');
    setHair('');
    setLocation('');
    setTagInput('');
    setTags([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (selectedFiles.length === 0) {
      setUploadError('Please select at least one file to upload');
      return;
    }
    
    if (!photographer) {
      setUploadError('Please add a photographer credit');
      return;
    }
    
    // Start upload process
    setUploadStatus('uploading');
    setUploadProgress(0);
    setUploadError(null);
    
    try {
      // In a real implementation, you would upload the files to a server here
      // For demonstration, we'll simulate the upload process
      
      // Create BaggyPhoto objects from the selected files
      const uploadedPhotos: BaggyPhoto[] = [];
      
      // Simulate progress updates
      const totalFiles = selectedFiles.length;
      let completedFiles = 0;
      
      for (const file of selectedFiles) {
        // This would be an API call to upload the file in a real implementation
        // For demo purposes, we'll create a data URL
        const photoUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        
        // Generate a unique ID for the photo
        const photoId = `photo-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        
        // Create a BaggyPhoto object
        uploadedPhotos.push({
          id: photoId,
          url: photoUrl,
          title: title || file.name.split('.')[0], // Use filename as default title if not provided
          collection: collection,
          credits: {
            photographer: photographer,
            agency: agency,
            models: models,
            stylist: stylist,
            makeup: makeup,
            hair: hair,
            location: location
          },
          metadata: {
            date: date,
            tags: tags,
            featured: false
          }
        });
        
        // Update progress
        completedFiles++;
        setUploadProgress(Math.round((completedFiles / totalFiles) * 100));
      }
      
      // Call the onUpload callback with the created photos
      onUpload(uploadedPhotos);
      
      // Reset form
      resetForm();
      setUploadStatus('success');
      
      // After 3 seconds, reset success status
      setTimeout(() => {
        setUploadStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setUploadError('An error occurred during upload. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-black/20 p-6 rounded-lg border border-white/10">
      <h2 className="text-xl font-bold mb-6">Upload Photos</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Images
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-white/20 rounded-md bg-black/30"
          />
          {selectedFiles.length > 0 && (
            <p className="mt-2 text-sm text-white/70">
              {selectedFiles.length} file(s) selected
            </p>
          )}
        </div>
        
        {/* Title and Collection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Photo title"
              className="w-full p-2 border border-white/20 rounded-md bg-black/30"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Collection
            </label>
            {showNewCollectionInput ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCollection}
                  onChange={(e) => setNewCollection(e.target.value)}
                  placeholder="Enter new collection name"
                  className="flex-1 p-2 border border-white/20 rounded-md bg-black/30"
                />
                <button
                  type="button"
                  onClick={handleAddCollection}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewCollectionInput(false)}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <select
                  value={collection}
                  onChange={(e) => setCollection(e.target.value)}
                  className="flex-1 p-2 border border-white/20 rounded-md bg-black/30"
                >
                  {collections.map((col, index) => (
                    <option key={`collection-option-${index}`} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
                {allowNewCollections && (
                  <button
                    type="button"
                    onClick={() => setShowNewCollectionInput(true)}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md"
                  >
                    New
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Date Taken
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-white/20 rounded-md bg-black/30"
          />
        </div>
        
        {/* Photographer and Agency Credits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Photographer *
            </label>
            <input
              type="text"
              value={photographer}
              onChange={(e) => setPhotographer(e.target.value)}
              placeholder="Photographer name"
              className="w-full p-2 border border-white/20 rounded-md bg-black/30"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Agency
            </label>
            <input
              type="text"
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              placeholder="Agency name"
              className="w-full p-2 border border-white/20 rounded-md bg-black/30"
            />
          </div>
        </div>
        
        {/* Models */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Models
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={modelInput}
              onChange={(e) => setModelInput(e.target.value)}
              placeholder="Add model name"
              className="flex-1 p-2 border border-white/20 rounded-md bg-black/30"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddModel();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddModel}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md"
            >
              Add
            </button>
          </div>
          
          {models.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {models.map((model, index) => (
                <div
                  key={`model-${index}`}
                  className="bg-white/10 px-2 py-1 rounded-md flex items-center"
                >
                  <span className="text-sm">{model}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveModel(model)}
                    className="ml-2 text-white/70 hover:text-white"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Styling Credits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Stylist
            </label>
            <input
              type="text"
              value={stylist}
              onChange={(e) => setStylist(e.target.value)}
              placeholder="Stylist name"
              className="w-full p-2 border border-white/20 rounded-md bg-black/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Makeup Artist
            </label>
            <input
              type="text"
              value={makeup}
              onChange={(e) => setMakeup(e.target.value)}
              placeholder="Makeup artist name"
              className="w-full p-2 border border-white/20 rounded-md bg-black/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Hair Stylist
            </label>
            <input
              type="text"
              value={hair}
              onChange={(e) => setHair(e.target.value)}
              placeholder="Hair stylist name"
              className="w-full p-2 border border-white/20 rounded-md bg-black/30"
            />
          </div>
        </div>
        
        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Photo location"
            className="w-full p-2 border border-white/20 rounded-md bg-black/30"
          />
        </div>
        
        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tag"
              className="flex-1 p-2 border border-white/20 rounded-md bg-black/30"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md"
            >
              Add
            </button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <div
                  key={`tag-${index}`}
                  className="bg-white/10 px-2 py-1 rounded-md flex items-center"
                >
                  <span className="text-sm">{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-white/70 hover:text-white"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Upload button & status */}
        <div>
          {uploadStatus === 'idle' && (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-white text-black font-medium rounded-md hover:bg-white/90 transition-colors"
            >
              Upload Photos
            </button>
          )}
          
          {uploadStatus === 'uploading' && (
            <div className="space-y-2">
              <div className="w-full bg-white/10 rounded-full h-2.5">
                <div
                  className="bg-white h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-white/70 text-center">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}
          
          {uploadStatus === 'success' && (
            <div className="text-center text-green-400 py-2">
              Upload successful!
            </div>
          )}
          
          {uploadStatus === 'error' && (
            <div className="text-center text-red-400 py-2">
              {uploadError || 'An error occurred during upload.'}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default BaggyPhotoUploader; 