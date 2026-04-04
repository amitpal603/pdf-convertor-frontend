import { useState } from 'react';
import api from '../services/api';

export const useConverter = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const convertPdfToImage = async (file, format = 'jpeg') => {
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('outputFormat', format);

        try {
            const res = await api.post('/pdf/convert/pdf-to-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return res.data.data;
        } catch (err) {
            setError(err.response?.data?.message || 'PDF to Image conversion failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const convertImageToPdf = async (files) => {
        setLoading(true);
        setError(null);
        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        try {
            const res = await api.post('/pdf/convert/image-to-pdf', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return res.data.pdf;
        } catch (err) {
            setError(err.response?.data?.message || 'Image to PDF conversion failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        convertPdfToImage,
        convertImageToPdf
    };
};
