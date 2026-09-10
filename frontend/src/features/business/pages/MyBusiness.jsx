import React from 'react';
import { SectionHead } from '../../../components/common/SectionHead';
import { C } from '../../../constants/theme';
import { Building2, Plus, Factory } from 'lucide-react';
import { Btn } from '../../../components/common/Btn';

export function MyBusiness() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <SectionHead 
        eyebrow="Phase 1 & 2"
        title="My Business Profile" 
        sub="Manage your primary business entity and registered factory units here." 
      />

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
            <Building2 size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: C.navyDeep }}>Primary Entity</h3>
          <p className="text-sm text-gray-500 mb-6">Manage your main corporate identity, PAN, and overarching incorporation details.</p>
          <Btn variant="outline" className="w-full">Edit Profile</Btn>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-dashed border-gray-300">
          <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4 text-orange-600">
            <Factory size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: C.navyDeep }}>Factory Units</h3>
          <p className="text-sm text-gray-500 mb-6">Register a new factory or plot to begin applying for site-specific clearances.</p>
          <Btn className="w-full flex items-center justify-center gap-2">
            <Plus size={16} /> Add New Unit
          </Btn>
        </div>
      </div>
    </div>
  );
}
