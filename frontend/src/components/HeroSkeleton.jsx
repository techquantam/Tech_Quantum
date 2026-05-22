import React from 'react';

const HeroSkeleton = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#FFF9F5] w-full pt-20 pb-12">
      {/* Background blur blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side Skeleton */}
          <div className="max-w-2xl animate-pulse space-y-8">
            {/* Live Badge placeholder */}
            <div className="h-9 w-52 bg-orange-100/60 border border-orange-200/30 rounded-full"></div>
            
            {/* Heading placeholder */}
            <div className="space-y-4">
              <div className="h-12 w-11/12 bg-slate-200/60 rounded-2xl"></div>
              <div className="h-12 w-8/12 bg-slate-200/60 rounded-2xl"></div>
            </div>
            
            {/* Subtitle placeholder */}
            <div className="space-y-3">
              <div className="h-6 w-full bg-slate-200/40 rounded-xl"></div>
              <div className="h-6 w-10/12 bg-slate-200/40 rounded-xl"></div>
            </div>
            
            {/* Tech Tags placeholders */}
            <div className="flex flex-wrap gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 w-24 bg-slate-200/30 border border-slate-200/20 rounded-full"></div>
              ))}
            </div>
            
            {/* CTA Buttons placeholder */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="h-14 w-full sm:w-44 bg-orange-200/40 rounded-xl"></div>
              <div className="h-14 w-full sm:w-44 bg-slate-200/40 rounded-xl"></div>
            </div>
          </div>
          
          {/* Right Side Skeleton */}
          <div className="w-full flex justify-center lg:justify-end items-center overflow-visible lg:pr-12">
            <div className="relative w-full max-w-[420px] aspect-[4/3] sm:aspect-[1.3] bg-white/40 border border-white/40 backdrop-blur-xl rounded-[2.5rem] p-6 shadow-xl animate-pulse flex flex-col justify-between">
              {/* Top border glowing highlight placeholder */}
              <div className="absolute inset-0 border border-orange-500/10 rounded-[2.5rem] pointer-events-none"></div>
              
              {/* Inner card elements mock */}
              <div className="h-8 w-28 bg-slate-200/50 rounded-xl"></div>
              <div className="flex-1 my-6 bg-slate-200/30 rounded-2xl"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 w-36 bg-slate-200/50 rounded-lg"></div>
                <div className="h-10 w-10 bg-orange-200/40 rounded-full"></div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
