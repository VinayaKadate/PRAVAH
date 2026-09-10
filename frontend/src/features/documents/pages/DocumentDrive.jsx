import React, { useState } from 'react';
import { SectionHead } from '../../../components/common/SectionHead';
import { C } from '../../../constants/theme';
import { FolderOpen, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { Btn } from '../../../components/common/Btn';
import { useMockApp } from '../../../contexts/MockAppContext';
import { UploadDocumentModal } from '../components/UploadDocumentModal';

export function DocumentDrive() {
  const { documents, addDocument } = useMockApp();
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <SectionHead 
        eyebrow="Phase 3"
        title="Document Drive" 
        sub="Your centralized repository for all official documents and plans." 
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-8">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: C.navyDeep }}>
            <FolderOpen size={18} /> Root Directory
          </div>
          <Btn className="flex items-center gap-2" variant="outline" onClick={() => setShowUploadModal(true)}>
            <Upload size={16} /> Upload New Document
          </Btn>
        </div>
        
        <div className="divide-y divide-gray-100">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">{doc.name}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <span className="font-mono text-slate-400">{doc.id}</span> • 
                    Uploaded on {doc.uploadDate} • 
                    {doc.status === 'verified' ? (
                      <span className="text-emerald-600 flex items-center font-semibold"><CheckCircle2 size={12} className="mr-0.5" /> AI Verified</span>
                    ) : (
                      <span className="text-amber-600 font-semibold">Pending Review</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-400">{doc.size || '1.2 MB'}</span>
                <Btn variant="ghost">View</Btn>
              </div>
            </div>
          ))}
          {documents.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-sm">
              No documents uploaded yet.
            </div>
          )}
        </div>
      </div>

      {showUploadModal && (
        <UploadDocumentModal 
          onClose={() => setShowUploadModal(false)} 
          onUpload={addDocument} 
        />
      )}
    </div>
  );
}
