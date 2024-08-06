import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const downloadImage = async (type, filename) => {
  try {
    const response = await axios.get(
      `${backendUrl}/images/download/${type}/${filename}`,
      {
        responseType: "blob", // Important to get the response as a blob
      }
    );

    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;

    link.download = filename;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Error downloading the image:", error);
  }
};

export default downloadImage;
