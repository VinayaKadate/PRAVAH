import React from 'react';
import { SectionHead } from '../../../components/common/SectionHead';
import { C } from '../../../constants/theme';
import { FolderOpen, Upload, FileText } from 'lucide-react';
import { Btn } from '../../../components/common/Btn';

export function DocumentDrive() {
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
          <Btn className="flex items-center gap-2" variant="outline">
            <Upload size={16} /> Upload New Document
          </Btn>
        </div>
        
        <div className="divide-y divide-gray-100">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-900">Incorporation_Certificate_2026.pdf</div>
                  <div className="text-xs text-gray-500">Uploaded on Sept 10, 2026 • AI Verified ✅</div>
                </div>
              </div>
              <Btn variant="ghost">View</Btn>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
