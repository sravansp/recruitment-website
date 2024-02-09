import { readFile } from "./cropImage";
import { useImageCropContext } from "./ImageCropProvider";
// import ButtonClick from '../components/base/ButtonClick';
import Cropper from "./Cropper";
import { RotationSlider, ZoomSlider } from "./Sliders";
import { ButtonClick } from "antd";

const ImageCropModalContent = ({ handleDone, handleClose }) => {
  const { setImage } = useImageCropContext();

  const handleFileChange = async ({ target: { files } }) => {
    const file = files && files[0];
    const imageDataUrl = await readFile(file);
    setImage(imageDataUrl);
  };

  return (
    <div className="relative text-center">
      <h5 className="mb-4 text-gray-800">Edit profile picture</h5>
      <div className="p-6 border border-gray-200 border-dashed rounded-lg">
        <div className="flex justify-center">
          <div className="mb-4 crop-container">
            <Cropper />
          </div>
        </div>
        <ZoomSlider className="mb-4" />
        <RotationSlider className="mb-4" />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="avatarInput"
          accept="image/*"
        />

        <ButtonClick
          variant="light"
          className="w-full mb-4 shadow hover:shadow-lg"
        >
          <label htmlFor="avatarInput">Upload Another Picture</label>
        </ButtonClick>
        <div className="flex gap-2">
          <ButtonClick variant="secondary" onClick={handleClose}>
            Cancel
          </ButtonClick>
          <ButtonClick
            variant="primary"
            className="w-full"
            onClick={handleDone}
          >
            Done & Save
          </ButtonClick>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModalContent;
