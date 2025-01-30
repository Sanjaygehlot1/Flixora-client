import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const DeleteVideoPopup = ({ onDelete, onCancel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleDelete = () => {
    onDelete(); 
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal} className="bg-red-600 text-white">
        Delete Video
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this video? This action cannot be
              undone.
            </p>

            <div className="mt-6 flex justify-end space-x-4">
              <Button
                onClick={closeModal}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteVideoPopup;
