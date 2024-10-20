// src/ImageUpload.tsx
import React, { useState, ChangeEvent, useCallback } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../config/cropImage";
import { storage } from "../../config/firebase";
import api from "../../config/axios";
import ReactModal from "react-modal";
import "./index.scss";
import { toast } from "react-toastify";

ReactModal.setAppElement("#root"); 

interface ImageUploadProps {
  imgUrl?: string | null; // Định nghĩa prop imgUrl
}
const ImageUpload: React.FC<ImageUploadProps> = ({ imgUrl }) => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  // Thêm state để xác nhận vùng cắt
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const handleCancel = () => {
    setCroppedImage(null); // Reset ảnh cắt
    setImage(null); // Reset ảnh hiện tại
    setFile(null); // Reset file
    setIsCropping(false); // Đóng modal
    setIsSaved(false); // Đánh dấu là ảnh chưa được lưu
  };
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setFile(selectedFile);
        setIsCropping(true);
        // Đặt lại trạng thái cắt ảnh
        setCroppedImage(null);
        setCroppedAreaPixels(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setIsSaved(false);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      console.error("Không có file nào được chọn");
    }
  };

  const onCropComplete = useCallback(
    (
      _croppedArea: unknown,
      croppedAreaPixels: { x: number; y: number; width: number; height: number }
    ) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    try {
      if (image && croppedAreaPixels) {
        const croppedImageBlob = await getCroppedImg(image, croppedAreaPixels);
        const croppedImageUrl = URL.createObjectURL(croppedImageBlob);

        setCroppedImage(croppedImageUrl);
        setIsCropping(false);
      }
    } catch (e) {
      console.error(e);
      toast.error("Đã xảy ra lỗi cắt ảnh");
    }
  }, [image, croppedAreaPixels]);

  const handleSave = async () => {
    if (croppedImage && file) {
      setIsUploading(true);
      try {
        console.log("Đang upload ảnh...");
        const response = await fetch(croppedImage);
        const blob = await response.blob();

        const storageRef = ref(storage, `images/${file.name}`);
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Gửi link tới API để lưu vào database
        await api.put("Account/update-profile", JSON.stringify(downloadURL));
        setIsUploading(false);
        toast.success("Ảnh đã được lưu thành công!");
        setIsSaved(true);
      } catch {
        toast.error("Có lỗi xảy ra khi upload ảnh. Vui lòng thử lại.");
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="image-upload-container">
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="image-upload-input"
      />

      {!isCropping && (
        <div
          className="upload-circle"
          onClick={() => {
            console.log("Vòng tròn được nhấp");
            document.getElementById("image-upload")?.click();
          }}
          style={{
            backgroundImage: croppedImage
              ? `url(${croppedImage})`
              : imgUrl
                ? `url(${imgUrl})`
                : undefined, // Sử dụng imgUrl nếu không có croppedImage
          }}
        >
          {!croppedImage && <div className="placeholder" />}
        </div>
      )}

      <ReactModal
        isOpen={isCropping}
        onRequestClose={() => setIsCropping(false)}
        contentLabel="Crop Image"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="cropper-container">
          <div className="cropper-header">
            <button
              onClick={() => {
                console.log("Nút Cắt Ảnh được nhấn");
                showCroppedImage();
              }}
              className="crop-button"
            >
              Cắt Ảnh
            </button>
          </div>

          <Cropper
            image={image || ""}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />

          {/* Thêm div chứa nút xác nhận */}
          <div className="cropper-footer">
            <button
              onClick={() => {
                console.log("Nút Xác Nhận được nhấn");
                showCroppedImage(); // Gọi hàm để cắt ảnh
              }}
              className="confirm-button"
            >
              Xác Nhận
            </button>
          </div>
        </div>
      </ReactModal>

      {croppedImage && !isSaved && (
        <div className="button-container">
          <button
            onClick={handleSave}
            className="save-button"
            disabled={isUploading}
          >
            {isUploading ? "Đang lưu..." : "Lưu"}
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Hủy
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
