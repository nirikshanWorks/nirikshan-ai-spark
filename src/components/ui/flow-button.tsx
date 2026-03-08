'use client';
import { ArrowRight } from 'lucide-react';

export function FlowButton({ text = "Modern Button" }: { text?: string }) {
  return (
    <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25">
      {/* Left arrow (arr-2) */}
      <span className="absolute left-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4">
        <ArrowRight className="w-4 h-4" />
      </span>

      {/* Text */}
      <span className="relative transition-all duration-300 group-hover:translate-x-3 font-medium text-sm tracking-wide">
        {text}
      </span>

      {/* Circle */}
      <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/20 transition-all duration-300 group-hover:translate-x-3 group-hover:opacity-0">
        <ArrowRight className="w-3.5 h-3.5" />
      </span>
    </button>
  );
}
