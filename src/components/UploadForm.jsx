import React, { useState } from "react";

const UploadForm = () => {
  const [formData, setFormData] = useState({
    kodeArsip: "",
    namaArsip: "",
    kategori: "",
    keterangan: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log("Form Data:", formData);
    // Reset the form
    setFormData({
      kodeArsip: "",
      namaArsip: "",
      kategori: "",
      keterangan: "",
      file: null,
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Upload File Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="kodeArsip" className="block font-medium">
            Kode Arsip
          </label>
          <input
            type="text"
            id="kodeArsip"
            name="kodeArsip"
            value={formData.kodeArsip}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="namaArsip" className="block font-medium">
            Nama Arsip
          </label>
          <input
            type="text"
            id="namaArsip"
            name="namaArsip"
            value={formData.namaArsip}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="kategori" className="block font-medium">
            Kategori
          </label>
          <select
            id="kategori"
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          >
            <option value="">Select Kategori</option>
            <option value="Category 1">Tidak Berkategori</option>
            <option value="Category 2">Nota Dinas</option>
            <option value="Category 3">Surat Perintah</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="keterangan" className="block font-medium">
            Keterangan
          </label>
          <textarea
            id="keterangan"
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block font-medium">
            Choose a File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="w-full border"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
};
export default UploadForm;
