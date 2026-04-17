"use client";

import { useEffect } from "react";

export function ConsoleLogger() {
  useEffect(() => {
    const asciiArt = `
   ______                _       _   _   _ _                         
  |  ____|              (_)     | | | | (_) |                        
  | |__   _ __   __ _ _ _ _ __  | |_| |_ _| | __ _  ___ _ __ ___      
  |  __| | '_ \\ / _\` | | | | '_ \\ |  _  | | |/ _\` |/ _ \\ '__/ __|     
  | |____| | | | (_| | | | | | | | | | | | | | (_| |  __/ |  \\__ \\     
  |______|_| |_|\\__, |_| |_|_| |_| \\_| |_|_|_|\\__, |\\___|_|  |___/     
                 __/ |                        __/ |                    
                |___/                        |___/                     

  Hey there, fellow developer! 👋
  Looking for bugs? Or just curious about the tech stack?
  
  Stack: Next.js 16, TypeScript, Tailwind CSS v4, Radix UI, Framer Motion.
  
  "There are 10 types of people in the world: 
   those who understand binary, and those who don't."
  
  Want to work together? 
  Check out my contact page or reach out at andreas_hilgers@icloud.com
    `;

    console.log(
      `%c${asciiArt}`,
      "color: #10b981; font-family: monospace; font-weight: bold; text-shadow: 0 0 5px rgba(16, 185, 129, 0.4);"
    );
    
    console.log(
      "%c>> SYSTEM STATUS: ALL SYSTEMS NOMINAL. COFFEE LEVEL: CRITICAL <<",
      "color: #f59e0b; font-weight: bold; background: #000; padding: 4px 8px; border-radius: 4px;"
    );
  }, []);

  return null;
}
