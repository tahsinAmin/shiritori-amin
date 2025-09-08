"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";

type TabContentProps = {
  title: string;
  description: string;
  videoUrl: string;
  code: string;
};

export default function TabContent({ title, description, videoUrl, code }: TabContentProps) {
  const [showVideo, setShowVideo] = useState(true);

  return (
    <div className="flex-1 p-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setShowVideo(true)}
            className={`px-4 py-2 rounded-lg ${showVideo ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Video
          </button>
          <button
            onClick={() => setShowVideo(false)}
            className={`px-4 py-2 rounded-lg ${!showVideo ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Code
          </button>
        </div>

        {showVideo ? (
          <div className="aspect-video rounded-lg overflow-hidden shadow">
            <iframe
              className="w-full h-full"
              src={videoUrl}
              title={title}
              allowFullScreen
            />
          </div>
        ) : (
          <CodeBlock code={code} />
        )}
      </div>
    </div>
  );
}
