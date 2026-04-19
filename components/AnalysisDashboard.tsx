
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', impact: 40 },
  { month: 'Feb', impact: 30 },
  { month: 'Mar', impact: 85 },
  { month: 'Apr', impact: 55 },
  { month: 'May', impact: 70 },
  { month: 'Jun', impact: 95 },
];

const AnalysisDashboard: React.FC = () => {
  return (
    <section id="analytics" className="py-20">
      <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">Velocity_Metrics</h2>
      <div className="h-64 w-full bg-white/5 border border-white/10 rounded-2xl p-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ background: '#000', border: '1px solid #333', borderRadius: '12px' }}
              itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
            />
            <Area type="monotone" dataKey="impact" stroke="#ffde03" fill="#ffde03" fillOpacity={0.1} strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 font-mono text-[10px] text-white/30 uppercase tracking-widest text-center">Projected growth trend // Q1-Q2 2026</p>
    </section>
  );
};

export default AnalysisDashboard;
