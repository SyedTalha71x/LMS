// for super admin vide and docs section
// Helper function
const generateThumbnail = (title) => {
  const encodedTitle = encodeURIComponent(title);
  return `https://via.placeholder.com/300x200/0000FF/FFFFFF?text=${encodedTitle}`;
};

export const newVideosData = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React framework",
    tags: "react, frontend",
    category: "Tutorial",
    date: "2025-05-15",
    thumbnail: generateThumbnail("Introduction to React"),
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    usageStats: {
      totalViews: 1250,
      activeUsers: 45,
      completionRate: 78,
      lastAccessed: "2025-09-20"
    }
  },
  {
    id: 2,
    title: "Advanced CSS Techniques",
    description: "Master modern CSS layouts and animations",
    tags: "css, design",
    category: "Tutorial",
    date: "2025-05-10",
    thumbnail: generateThumbnail("Advanced CSS Techniques"),
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    usageStats: {
      totalViews: 890,
      activeUsers: 32,
      completionRate: 65,
      lastAccessed: "2025-09-18"
    }
  },
  {
    id: 3,
    title: "JavaScript ES6 Features",
    description: "Explore modern JavaScript features and syntax",
    tags: "javascript, es6",
    category: "Tutorial",
    date: "2025-05-12",
    thumbnail: generateThumbnail("JavaScript ES6 Features"),
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    usageStats: {
      totalViews: 1500,
      activeUsers: 67,
      completionRate: 82,
      lastAccessed: "2025-09-22"
    }
  },
];



  export const newDocsData = [
    {
      id: 1,
      title: "Project Documentation",
      description: "Complete guide to project setup and architecture",
      tags: "documentation, guide",
      category: "Reference",
      date: "2025-05-20",
      usageStats: {
        totalViews: 2100,
        activeUsers: 68,
        completionRate: 85,
        lastAccessed: "2025-09-22"
      }
    },
    {
      id: 2,
      title: "API Specifications",
      description: "Detailed API endpoints and usage examples",
      tags: "api, backend",
      category: "Reference",
      date: "2025-05-18",
      usageStats: {
        totalViews: 1450,
        activeUsers: 54,
        completionRate: 72,
        lastAccessed: "2025-09-21"
      }
    },
  ]