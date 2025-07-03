import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Edit3, Save, X } from 'lucide-react';

interface JournalPromptProps {
  prompt: {
    id: number;
    title: string;
    category: string;
    prompt: string;
    icon: React.ComponentType<any>;
    color: string;
    date: string;
  };
  onSelect: () => void;
}

const JournalPrompt: React.FC<JournalPromptProps> = ({ prompt, onSelect }) => {
  const [isWriting, setIsWriting] = useState(false);
  const [response, setResponse] = useState('');

  const handleStartWriting = () => {
    setIsWriting(true);
    onSelect();
  };

  const handleSave = () => {
    // Here you would save the response
    console.log('Saving response:', response);
    setIsWriting(false);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-white/10 ${prompt.color}`}>
            <prompt.icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{prompt.title}</h3>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <span>{prompt.category}</span>
              <span>•</span>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {prompt.date}
              </div>
            </div>
          </div>
        </div>
        
        {!isWriting && (
          <button
            onClick={handleStartWriting}
            className="btn-secondary text-sm px-4 py-2"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Write
          </button>
        )}
      </div>

      <p className="text-white/80 leading-relaxed mb-4">
        {prompt.prompt}
      </p>

      {isWriting && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4"
        >
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Start writing your reflection..."
            className="w-full h-32 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-spotify-green"
          />
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsWriting(false)}
              className="px-4 py-2 text-white/70 hover:text-white transition-colors duration-200"
            >
              <X className="h-4 w-4 mr-2 inline" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary text-sm px-4 py-2"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Entry
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default JournalPrompt;