import { useState } from 'react';
import user1 from '../assets/user_1.png';
import Modal from '../components/base/Modal';
import { readFile } from './cropImage';
import ImageCropModalContent from './ImageCropModalContent';
import { useImageCropContext } from './ImageCropProvider';

const ImageCrop = () => {
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(user1);

  const { getProcessedImage, setImage, resetStates } = useImageCropContext();

  const handleDone = async () => {
    const avatar = await getProcessedImage();
    setPreview(window.URL.createObjectURL(avatar));
    resetStates();
    setOpenModal(false);
  };

  const handleFileChange = async ({ target: { files } }) => {
    const file = files && files[0];
    const imageDataUrl = await readFile(file);
    setImage(imageDataUrl);
    setOpenModal(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="avatarInput"
        accept="image/*"
      />
      <label htmlFor="avatarInput" className="cursor-pointer">
        <img
          src={preview}
          height={192}
          width={192}
          className="object-cover w-48 h-48 rounded-full"
          alt=""
        />
      </label>

      <Modal open={openModal} handleClose={() => setOpenModal(false)}>
        <ImageCropModalContent handleDone={handleDone} handleClose={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
};

export default ImageCrop;