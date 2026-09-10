import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  LayoutDashboard, FileText, Users, Calculator,
  HelpCircle, AlertTriangle, MessageSquare, Search,
  Calendar as CalendarIcon, Filter
} from 'lucide-react';
import { C } from '../../../constants/theme';
import { useTranslation } from '../../../contexts/TranslationContext';
import { useNavigate } from 'react-router-dom';

const lineData = [
  { name: 'Jan', Applications: 1000, Disposed: 800, Services: 900 },
  { name: 'Feb', Applications: 2000, Disposed: 1500, Services: 1800 },
  { name: 'Mar', Applications: 1500, Disposed: 1200, Services: 1600 },
  { name: 'Apr', Applications: 2000, Disposed: 1800, Services: 2100 },
  { name: 'May', Applications: 18000, Disposed: 15000, Services: 17000 },
  { name: 'Jun', Applications: 35000, Disposed: 30000, Services: 31000 },
  { name: 'Jul', Applications: 38000, Disposed: 35000, Services: 36000 },
  { name: 'Aug', Applications: 42000, Disposed: 39000, Services: 40000 },
  { name: 'Sep', Applications: 15000, Disposed: 14000, Services: 14500 },
  { name: 'Oct', Applications: 0, Disposed: 0, Services: 0 },
  { name: 'Nov', Applications: 0, Disposed: 0, Services: 0 },
  { name: 'Dec', Applications: 0, Disposed: 0, Services: 0 },
];

const grievancesData = [
  { name: 'Replied', value: 400 },
  { name: 'Closed', value: 300 },
  { name: 'Pending', value: 300 },
  { name: 'Total', value: 1000 },
];

const queriesData = [
  { name: 'Total', value: 800 },
  { name: 'Pending', value: 200 },
  { name: 'Closed', value: 400 },
  { name: 'Replied', value: 200 },
];

const feedbackData = [
  { name: 'Negative', value: 10 },
  { name: 'Neutral', value: 20 },
  { name: 'Positive', value: 70 },
];

const PIE_COLORS = {
  Grievances: ['#047857', '#1E3A8A', '#D97706', '#F59E0B'],
  Queries: ['#F97316', '#FACC15', '#0F766E', '#1D4ED8'],
  Feedback: ['#0369A1', '#0F766E', '#EA580C']
};

export const InvestorDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('count');

  return (
    <div className="flex-1 flex flex-col bg-slate-50 font-sans" style={{ minHeight: 'calc(100vh - 120px)' }}>
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOP TABS */}
        <div className="bg-white border-b border-slate-200 px-6 flex items-end">
          <button
            onClick={() => setActiveTab('count')}
            className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${activeTab === 'count' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Application Count
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${activeTab === 'summary' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Application Summary
          </button>
          <button
            onClick={() => setActiveTab('wise')}
            className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${activeTab === 'wise' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Application Wise Details
          </button>
          <button
            onClick={() => setActiveTab('dept')}
            className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${activeTab === 'dept' ? 'border-blue-600 text-blue-700 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            Department Details
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* Header Row: Title & Filters combined */}
          <div className="flex flex-wrap lg:flex-nowrap items-end justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">{t.dash.title || "Dashboard Overview"}</h1>
              <p className="text-sm text-slate-500">{t.dash.sub || "Real-time insights and analytics"}</p>
            </div>

            {/* Filters Row */}
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-wrap sm:flex-nowrap items-end gap-3 shrink-0">
              <div className="flex-1">
                <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">From</label>
                <div className="relative">
                  <CalendarIcon size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" defaultValue="January 1st, 2016" className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-[11px] font-semibold text-slate-500 mb-0.5">To</label>
                <div className="relative">
                  <CalendarIcon size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" defaultValue="September 11th, 2026" className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-blue-700">Apply</button>
                <button className="px-4 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg shadow-sm hover:bg-slate-200 border border-slate-200">Reset</button>
              </div>
            </div>
          </div>

          {/* 4 Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-4 text-white shadow-md flex justify-between relative overflow-hidden">
              <div className="absolute -right-2 -bottom-2 opacity-10"><LayoutDashboard size={80} /></div>
              <div>
                <p className="text-xs font-medium text-blue-100">{t.dash.totalServ}</p>
                <h3 className="text-2xl font-black mt-1">179</h3>
              </div>
              <div className="bg-white/20 p-2 rounded-lg h-fit"><LayoutDashboard size={18} /></div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-xl p-4 text-white shadow-md flex justify-between relative overflow-hidden">
              <div className="absolute -right-2 -bottom-2 opacity-10"><FileText size={80} /></div>
              <div>
                <p className="text-xs font-medium text-purple-100">{t.dash.apps}</p>
                <h3 className="text-2xl font-black mt-1">5,67,805</h3>
                <span className="inline-block mt-1 text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">26.30% vs last month</span>
              </div>
              <div className="bg-white/20 p-2 rounded-lg h-fit"><FileText size={18} /></div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-4 text-white shadow-md flex justify-between relative overflow-hidden">
              <div className="absolute -right-2 -bottom-2 opacity-10"><AlertTriangle size={80} /></div>
              <div>
                <p className="text-xs font-medium text-orange-100">{t.dash.grievances}</p>
                <h3 className="text-2xl font-black mt-1">5,473</h3>
                <span className="inline-block mt-1 text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">14.15% vs last month</span>
              </div>
              <div className="bg-white/20 p-2 rounded-lg h-fit"><AlertTriangle size={18} /></div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 text-white shadow-md flex justify-between relative overflow-hidden">
              <div className="absolute -right-2 -bottom-2 opacity-10"><HelpCircle size={80} /></div>
              <div>
                <p className="text-xs font-medium text-emerald-100">{t.dash.queries}</p>
                <h3 className="text-2xl font-black mt-1">4,858</h3>
                <span className="inline-block mt-1 text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">17.06% vs last month</span>
              </div>
              <div className="bg-white/20 p-2 rounded-lg h-fit"><HelpCircle size={18} /></div>
            </div>
          </div>

          {/* Charts Area */}
          <div className="grid grid-cols-2 gap-4">

            {/* Main Line Chart */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm col-span-2 lg:col-span-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800 text-sm">Services Performance Trend <span className="text-blue-500 font-normal text-xs">(View)</span></h3>
                <div className="bg-slate-50 border border-slate-200 text-xs px-2 py-0.5 rounded shadow-sm">2026 ▾</div>
              </div>
              <div className="flex-1 min-h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(val) => val === 0 ? '0' : `${val / 1000}k`} />
                    <RechartsTooltip />
                    <Legend iconType="square" wrapperStyle={{ fontSize: '10px' }} />
                    <Line type="monotone" dataKey="Applications" stroke="#f97316" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    <Line type="monotone" dataKey="Disposed" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Services" stroke="#10b981" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:col-span-1">
              {/* Grievances Status */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-800 text-sm">Grievances Status <span className="text-blue-500 font-normal text-xs">(View)</span></h3>
                </div>
                <div className="flex-1 min-h-[160px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={grievancesData} innerRadius={45} outerRadius={65} paddingAngle={2} dataKey="value" stroke="none">
                        {grievancesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS.Grievances[index % PIE_COLORS.Grievances.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend iconType="square" layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Bottom 2 Pies */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800 text-sm">Queries Status <span className="text-blue-500 font-normal text-xs">(View)</span></h3>
              </div>
              <div className="flex-1 min-h-[160px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={queriesData} innerRadius={45} outerRadius={65} paddingAngle={2} dataKey="value" stroke="none">
                      {queriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS.Queries[index % PIE_COLORS.Queries.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend iconType="square" layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800 text-sm">Feedback Overview <span className="text-blue-500 font-normal text-xs">(View)</span></h3>
              </div>
              <div className="flex-1 min-h-[160px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={feedbackData} innerRadius={45} outerRadius={65} paddingAngle={2} dataKey="value" stroke="none">
                      {feedbackData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS.Feedback[index % PIE_COLORS.Feedback.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend iconType="square" layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between px-10">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Quick Statistics</div>
            <div className="text-center">
              <p className="text-xl font-black text-blue-600">91.50%</p>
              <p className="text-xs text-slate-400 font-medium">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-orange-500">91.17%</p>
              <p className="text-xs text-slate-400 font-medium">Resolution Rate</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-purple-600">0</p>
              <p className="text-xs text-slate-400 font-medium">Total Users</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
