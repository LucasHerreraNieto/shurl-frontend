import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Short_url_tool = ({ usuarioLogeado, userName }) => {
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`${API_URL}/${shortenedUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = e.target.url.value.trim();

        if (!url) {
            alert("Please enter a URL");
            return;
        }

        // Validación básica usando constructor URL
        try {
            new URL(url);
        } catch (e) {
            alert("Please enter a valid URL");
            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/urls`,
                {
                    originalUrl: url,
                    userName: userName
                },
                {
                    withCredentials: true
                }
            );
            setShortenedUrl(response.data.shortUrl);
            e.target.url.value = ''; // Limpia el input original
        } catch (error) {
            console.error('Error shortening URL:', error);
            alert(error.response?.data?.error || 'Something went wrong');
        }
    };

    if (!usuarioLogeado) return <Navigate to="/" replace />;

    return (
        <div className="flex items-center justify-center px-4">
            <form
                className="bg-gray-950 text-white p-8 rounded-3xl shadow-2xl min-w-96 space-y-6 animate-fadeIn"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-bold text-white text-center">
                    🔗 Short URL Tool
                </h2>

                <div>
                    <label htmlFor="url" className="block mb-2 text-gray-400 text-sm">
                        Enter URL to shorten:
                    </label>
                    <input
                        type="text"
                        id="url"
                        name="url"
                        placeholder="https://example.com"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 font-semibold transition-all duration-200 shadow-md"
                >
                    🚀 Shorten URL
                </button>

                {shortenedUrl !== '' && (
                    <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl relative animate-fadeIn">
                        <label htmlFor="shortened-url" className="block mb-1 text-sm text-gray-400">
                            Shortened URL:
                        </label>
                        <input
                            type="text"
                            id="shortened-url"
                            value={`${API_URL}/${shortenedUrl}`}
                            readOnly
                            onClick={(e) => e.target.select()}
                            className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none"
                        />
                        <div className="flex items-center justify-between mt-2">
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="text-sm text-violet-400 hover:underline"
                            >
                                📋 Copy to clipboard
                            </button>
                            <span
                                className={`text-green-400 text-sm ml-2 transition-opacity duration-300 ${
                                    copied ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                ✔ Copied!
                            </span>
                        </div>
                        <p className="text-green-400 text-sm mt-2">✅ URL shortened successfully!</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Short_url_tool;
