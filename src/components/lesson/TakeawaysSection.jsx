import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card } from '../ui';

const TakeawaysSection = ({ data }) => {
  return (
    <section>
       <Card className="bg-emerald-500/5 border-emerald-500/20 p-10">
          <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
             <CheckCircle2 className="text-emerald-500" size={28} /> Key Takeaways
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {data.takeaways.map((task, i) => (
               <div key={i} className="flex gap-4 text-slate-300 font-medium">
                  <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <p>{task}</p>
               </div>
             ))}
          </div>
       </Card>
    </section>
  );
};

export default TakeawaysSection;
