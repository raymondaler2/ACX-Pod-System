import React, { useState } from 'react';

function CreateButtonUsers() {
  const [isDocumentVisible, setDocumentVisibility] = useState(false);
  const [formValues, setFormValues] = useState({
    sopTitle: '',
    milestone: '',
    serviceTag: '',
    sopDescription: '',
  });

  const toggleDocument = () => {
    setDocumentVisibility(!isDocumentVisible);
  };

  const closeDocument = () => {
    setDocumentVisibility(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === 'overlay') {
      closeDocument();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with values:', formValues);
    closeDocument();
  };

  return (
    <div>
      <button
        id="createButton"
        onClick={toggleDocument}
        className="bg-white text-blue-500 font-semibold px-10 py-3 rounded-full text-lg"
      >
        Create
      </button>

      {isDocumentVisible && (
        <>
          <div
            id="overlay"
            onClick={handleOverlayClick}
            className="fixed top-0 left-0 w-full h-full bg-gray-200 opacity-50"
          ></div>

          <div
            id="documentContainer"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-none border-gray-500 p-8 rounded-2xl z-10 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Create SOP</h2>
              <button
                onClick={closeDocument}
                className="text-black text-2xl inline-block"
              >
                x
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-2">
              <div>
                <label htmlFor="sopTitle" className="text-m font-semibold mt-4 mb-4 block">SOP Title:</label>
                <input
                  type="text"
                  id="sopTitle"
                  name="sopTitle"
                  value={formValues.sopTitle}
                  onChange={handleInputChange}
                  placeholder='Enter Title'
                  className="text-sm border border-gray-300 p-2 rounded-md w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="milestone" className="text-m font-semibold mt-4 mb-4 block">Milestone:</label>
                <input
                  type="text"
                  id="milestone"
                  name="milestone"
                  value={formValues.milestone}
                  onChange={handleInputChange}
                  placeholder='Enter Title'
                  className="text-sm border border-gray-300 p-2 rounded-md w-full"
                  required
                />
              </div>
              </form>
              <div>
                <label htmlFor="serviceTag" className="text-m font-semibold mt-4 mb-4 block">Service Tag</label>
                <input
                  type="text"
                  id="serviceTag"
                  name="serviceTag"
                  value={formValues.serviceTag}
                  onChange={handleInputChange}
                  placeholder='Choose Tag'
                  className="text-sm border border-gray-300 p-2 rounded-md w-1/2"
                  required
                />
              </div>

              <div>
                <label htmlFor="sopDescription" className="text-m font-semibold mt-4 mb-4 block">SOP Description</label>
                <textarea
                  id="sopDescription"
                  name="sopDescription"
                  value={formValues.sopDescription}
                  onChange={handleInputChange}
                  placeholder="Enter Title"
                  className="text-sm border border-gray-300 p-2 rounded-md w-1/2"
                  required
                />
              </div>

              <button type="submit" className="bg-blue-500 text-white px-10 py-2 mt-4 rounded-full">
                Next
              </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CreateButtonUsers;
