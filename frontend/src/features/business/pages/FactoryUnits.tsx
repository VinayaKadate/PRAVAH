import React, { useState } from 'react';
import { Factory, Zap, Droplets, Plus, Building2 } from 'lucide-react';
export const FactoryUnits = ({ units, onAddUnit }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUnit, setNewUnit] = useState({
    unitName: '',
    midcArea: 'Chakan Industrial Phase II',
    plotNumber: '',
    surveyNumber: '',
    taluka: 'Khed',
    district: 'Pune',
    category: 'Orange',
    powerSanctionedKva: 1500,
    waterDemandKl: 50,
    builtUpAreaSqM: 12000,
    operationalStatus: 'Under Construction'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    onAddUnit({
      ...newUnit,
      id: `UNIT-MH-${Math.floor(100 + Math.random() * 900)}`
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Factory size={16} />
            <span>MIDC Plots & Industrial Units Repository</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Registered Factory Units & Land Parcels</h2>
          <p className="text-slate-600 text-xs mt-1">
            Manage your industrial establishments across MIDC estates in Maharashtra, land lease deeds, sanctioned utility loads, and pollution categorizations.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow flex items-center space-x-2 self-start md:self-auto"
        >
          <Plus size={16} />
          <span>Register New Factory Unit</span>
        </button>
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {units.map((unit) => {
          const isRed = unit.category === 'Red';
          const isOrange = unit.category === 'Orange';

          return (
            <div key={unit.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all space-y-4">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-slate-400">{unit.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      isRed ? 'bg-red-100 text-red-800' : isOrange ? 'bg-orange-100 text-orange-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {unit.category} Category
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">{unit.unitName}</h3>
                </div>

                <span className="bg-slate-100 text-slate-800 font-bold text-[10px] px-2.5 py-1 rounded-lg">
                  {unit.operationalStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-bold">MIDC Estate</span>
                  <span className="font-bold text-slate-800">{unit.midcArea}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{unit.taluka}, {unit.district}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px] font-bold">Cadastral Plot & Survey</span>
                  <span className="font-bold text-blue-700">{unit.plotNumber}</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{unit.surveyNumber}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                <div className="p-2.5 bg-blue-50/60 rounded-xl border border-blue-100">
                  <Zap size={14} className="mx-auto text-amber-500 mb-1" />
                  <span className="text-[10px] text-slate-500 block">Sanctioned Power</span>
                  <span className="text-slate-900">{unit.powerSanctionedKva} kVA</span>
                </div>

                <div className="p-2.5 bg-sky-50/60 rounded-xl border border-sky-100">
                  <Droplets size={14} className="mx-auto text-sky-500 mb-1" />
                  <span className="text-[10px] text-slate-500 block">Water Quota</span>
                  <span className="text-slate-900">{unit.waterDemandKl} KLD</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <Building2 size={14} className="mx-auto text-slate-500 mb-1" />
                  <span className="text-[10px] text-slate-500 block">Built-up Area</span>
                  <span className="text-slate-900">{unit.builtUpAreaSqM.toLocaleString()} m²</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Unit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">Register New Industrial Unit</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Unit / Plant Name</label>
                <input
                  type="text"
                  placeholder="e.g. Pune Battery Packaging Facility"
                  value={newUnit.unitName}
                  onChange={(e) => setNewUnit({ ...newUnit, unitName: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 bg-white font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">MIDC Industrial Estate</label>
                  <input
                    type="text"
                    value={newUnit.midcArea}
                    onChange={(e) => setNewUnit({ ...newUnit, midcArea: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 bg-white font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Plot Number</label>
                  <input
                    type="text"
                    placeholder="e.g. Plot F-12"
                    value={newUnit.plotNumber}
                    onChange={(e) => setNewUnit({ ...newUnit, plotNumber: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 bg-white font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Survey / Gut Number</label>
                  <input
                    type="text"
                    placeholder="e.g. Survey 210/1"
                    value={newUnit.surveyNumber}
                    onChange={(e) => setNewUnit({ ...newUnit, surveyNumber: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 bg-white font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pollution Category</label>
                  <select
                    value={newUnit.category}
                    onChange={(e) => setNewUnit({ ...newUnit, category: e.target.value  })}
                    className="w-full border border-slate-300 rounded-xl p-3 bg-white font-bold"
                  >
                    <option value="Red">Red (Heavy)</option>
                    <option value="Orange">Orange (Moderate)</option>
                    <option value="Green">Green (Low)</option>
                    <option value="White">White (Zero)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Power Sanctioned (kVA)</label>
                  <input
                    type="number"
                    value={newUnit.powerSanctionedKva}
                    onChange={(e) => setNewUnit({ ...newUnit, powerSanctionedKva: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-xl p-3 bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Water Demand (KLD)</label>
                  <input
                    type="number"
                    value={newUnit.waterDemandKl}
                    onChange={(e) => setNewUnit({ ...newUnit, waterDemandKl: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-xl p-3 bg-white font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow transition-all"
                >
                  Save Factory Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
