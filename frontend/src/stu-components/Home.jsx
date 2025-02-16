import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const HomePage = () => {
  return (
    <div>
        
    <div className="min-h-screen flex items-center pt-2 justify-center bg-gray-100"  >
          <h1 className="text-7xl font-extrabold text-blue-600">
             <Typewriter
          words={["Welcome Student 🎓"]}
          
          cursor
          cursorStyle="..."
          typeSpeed={100}
          deleteSpeed={50}
        />
        
        <div>
          
        </div>
        </h1>
    </div>
    </div>
    
  );
};

export default HomePage;
