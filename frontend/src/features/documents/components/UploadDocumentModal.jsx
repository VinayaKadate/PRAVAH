import React, { useState } from 'react';
import { Upload, X, File, Loader2 } from 'lucide-react';

export function UploadDocumentModal({ onClose, onUpload }) {
  const [loading, setLoading] = useState(false);
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState('application/pdf');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!docName) return;
    
    setLoading(true);
    // Simulate upload delay
    await onUpload({
      name: docName,
      type: docType,
      size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      status: 'pending' // Usually 'verified' or 'pending'
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
          <h3 className="font-extrabold text-lg text-slate-900">Upload Document</h3>
          <button onClick={onClose} disabled={loading} className="text-slate-400 hover:text-slate-600 disabled:opacity-50">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
            <Upload size={32} className="mx-auto text-blue-500 mb-3" />
            <p className="text-sm font-semibold text-slate-700">Click to browse or drag file here</p>
            <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG up to 10MB</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Document Name / Title</label>
            <input
              type="text"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="e.g. Fire Safety Layout Plan"
              className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
              disabled={loading}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-50 rounded-lg disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !docName}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-2 disabled:opacity-70 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Uploading...
                </>
              ) : (
                'Confirm Upload'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
