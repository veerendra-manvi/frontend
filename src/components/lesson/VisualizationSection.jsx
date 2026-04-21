import { 
  SectionTitle, 
  ConceptVisualizer, 
  HashMapVisualizer, 
  JVMMemoryVisualizer,
  StreamPipelineVisualizer
} from '../ui';

const VisualizationSection = ({ 
  data, 
  viewMode,
  vizStep, 
  isPlaying, 
  onPlay, 
  onPause, 
  onNext, 
  onReset 
}) => {
  const visualizerType = data.visualizerType || 'inheritance';
  
  if (visualizerType === 'none') return null;

  const renderSelectedVisualizer = () => {
    switch (visualizerType) {
      case 'hashmap':
        return <HashMapVisualizer />;
      case 'jvmMemory':
        return <JVMMemoryVisualizer />;
      case 'streams':
        return <StreamPipelineVisualizer />;
      default:
        return (
          <ConceptVisualizer 
            conceptType={visualizerType}
            steps={data.vizSteps || []}
            currentStep={vizStep}
            isPlaying={isPlaying}
            onPlay={onPlay}
            onPause={onPause}
            onNext={onNext}
            onReset={onReset}
          />
        );
    }
  };

  return (
    <section className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
      <SectionTitle 
        title={data.vizTitle || "Conceptual Visualizer"} 
        subtitle={data.vizSubtitle || "See how things work under the hood."} 
      />
      
      {data.vizWhy && (
        <div className="p-5 bg-white/5 border border-white/5 rounded-2xl flex gap-4 items-center mb-6">
           <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary font-black text-[10px] uppercase tracking-widest">Logic Insight</div>
           <p className="text-sm text-slate-500 font-medium italic">"{data.vizWhy}"</p>
        </div>
      )}

      {renderSelectedVisualizer()}
    </section>
  );
};

export default VisualizationSection;
