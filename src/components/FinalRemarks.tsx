import React from 'react';
import { Heart } from 'lucide-react';

export function FinalRemarks() {
  return (
    <div className="mb-32">
      <h2 className="text-xl font-sora font-semibold text-[#ff6b35] mb-8 flex items-center gap-2">
        <Heart className="w-5 h-5" />
        Final Remarks
      </h2>

      <div className="space-y-6 font-inter text-gray-700">
        <p>Congrats for sticking around and scrolling down to the bottom!</p>

        <div className="space-y-4 mb-24">
          <p>
            Just a little reminder before you go: have fun, take care, be kind
            to each other, and most importantly, be kind to yourself.
          </p>
          <p>
            Things aren't always easy but you're doing it. You're doing good.
            You've got this.
          </p>
          <p>:)</p>
        </div>
      </div>
    </div>
  );
}
