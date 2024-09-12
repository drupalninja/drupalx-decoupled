import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const Spacing = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        {[1, 2, 3, 4].map((size) => (
          <div key={size} className="w-1/4 flex flex-col items-center">
            <Card className="w-full">
              <CardContent className={`p-${size} m-2 bg-blue-500 shadow-md ${size < 3 ? 'opacity-25' : size < 4 ? 'opacity-50' : size < 5 ? 'opacity-75' : ''}`}>
                <div className="h-4"></div>
              </CardContent>
            </Card>
            <div className="text-center text-gray-700">{size}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spacing;
