import React, { useState } from "react";
import { Loader2, Check, Clock, AlertTriangle, ArrowRight, Network } from "lucide-react";
import { SectionHead } from "../../../components/common/SectionHead";
import { Btn } from "../../../components/common/Btn";
import { C } from "../../../constants/theme";

export function ServicesApplied() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [roadmap, setRoadmap] = useState(true); // Always show roadmap for demo purposes

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      <div className="flex items-start justify-between">
        <SectionHead
          eyebrow="AI Approval Roadmap"
          title="Project Dependency Graph"
          sub="PRAVAH AI has analyzed your project profile and sequenced the required clearances to minimize delays."
        />
        <Btn className="flex items-center gap-2">
          <Network size={16} /> Re-Calculate Path
        </Btn>
      </div>

      {/* AI Roadmap Visualization */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-8">
        
        <div className="p-5 bg-slate-50 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900">Project: Sahyadri Precision Factory Setup</h3>
            <p className="text-sm text-gray-500 mt-1">Estimated Total Time: 45 Days (Optimized by AI)</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500"></span> Cleared</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Active</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-300"></span> Blocked/Pending</span>
          </div>
        </div>

        <div className="p-8 overflow-x-auto">
          {/* Node Based Dependency Flow */}
          <div className="min-w-[800px] flex items-center justify-between">
            
            {/* Stage 1: Pre-Establishment */}
            <div className="flex flex-col items-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">Phase 1: Foundation</h4>
              <div className="relative bg-green-50 border-2 border-green-500 text-green-800 p-4 rounded-lg w-56 text-center shadow-sm">
                <Check size={20} className="mx-auto mb-2 text-green-600" />
                <h5 className="font-bold text-sm">Land Allotment (MIDC)</h5>
                <p className="text-xs mt-1">Cleared: Aug 12, 2026</p>
              </div>
            </div>

            <ArrowRight className="text-gray-300 mx-4" size={32} />

            {/* Stage 2: Parallel NOCs */}
            <div className="flex flex-col items-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">Phase 2: Parallel Approvals</h4>
              <div className="space-y-4">
                <div className="relative bg-amber-50 border-2 border-amber-500 text-amber-900 p-4 rounded-lg w-56 text-center shadow-sm">
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow animate-pulse">SLA RISK</div>
                  <Clock size={20} className="mx-auto mb-2 text-amber-600" />
                  <h5 className="font-bold text-sm">Fire NOC</h5>
                  <p className="text-xs mt-1">Day 12 / 15 (Delayed)</p>
                </div>
                <div className="relative bg-green-50 border-2 border-green-500 text-green-800 p-4 rounded-lg w-56 text-center shadow-sm">
                  <Check size={20} className="mx-auto mb-2 text-green-600" />
                  <h5 className="font-bold text-sm">Tree Cutting NOC</h5>
                  <p className="text-xs mt-1">Cleared: Aug 20, 2026</p>
                </div>
              </div>
            </div>

            <ArrowRight className="text-gray-300 mx-4" size={32} />

            {/* Stage 3: Building Plan (Dependent on Fire NOC) */}
            <div className="flex flex-col items-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">Phase 3: Construction</h4>
              <div className="relative bg-gray-50 border-2 border-gray-300 text-gray-500 p-4 rounded-lg w-56 text-center opacity-70">
                <AlertTriangle size={20} className="mx-auto mb-2 text-gray-400" />
                <h5 className="font-bold text-sm">Building Plan Approval</h5>
                <p className="text-xs mt-1">Blocked by: Fire NOC</p>
              </div>
            </div>

            <ArrowRight className="text-gray-300 mx-4" size={32} />

            {/* Stage 4: Factory License */}
            <div className="flex flex-col items-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">Phase 4: Operations</h4>
              <div className="relative bg-gray-50 border-2 border-gray-200 text-gray-400 p-4 rounded-lg w-56 text-center opacity-50">
                <Clock size={20} className="mx-auto mb-2 text-gray-300" />
                <h5 className="font-bold text-sm">Factory License</h5>
                <p className="text-xs mt-1">Pending Pre-requisites</p>
              </div>
            </div>

          </div>
        </div>

        {/* AI Insight Box */}
        <div className="bg-blue-50 p-5 border-t border-blue-100 flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mt-1">
            <Network size={20} />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-1">PRAVAH AI Insight</h4>
            <p className="text-sm text-blue-800">
              The Building Plan Approval is currently blocked because the Fire NOC is experiencing regional delays. 
              <strong> Action Recommended:</strong> Prepare your factory site layouts now, so you can submit the Building Plan application the exact moment the Fire NOC is issued.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
