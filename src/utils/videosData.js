// for super admin vide and docs section
// Helper function


export const newVideosData = [
  {
    id: 1,
    title: "Intro to the Platform",
    description: "Overview of core features and navigation.",
    tags: "intro,getting-started,overview",
    category: "Tutorial",
    date: new Date().toISOString().split("T")[0],
    thumbnail: "/video-thumbnail-intro.png",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    usageStats: {
      totalViews: 124,
      activeUsers: 8,
      completionRate: 72,
      lastAccessed: new Date().toISOString().split("T")[0],
    },
  },
  {
    id: 2,
    title: "Advanced Tips",
    description: "Power-user tips to be more productive.",
    tags: "advanced,tips,productivity",
    category: "Guide",
    date: new Date().toISOString().split("T")[0],
    thumbnail: "/video-thumbnail-advanced-tips.jpg",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    usageStats: {
      totalViews: 89,
      activeUsers: 5,
      completionRate: 64,
      lastAccessed: new Date().toISOString().split("T")[0],
    },
  },
]

export const newDocsData = [
  {
    id: 1,
    title: "Getting Started Guide",
    description: "Step-by-step guide for new users.",
    tags: "docs,getting-started,guide",
    category: "Reference",
    date: new Date().toISOString().split("T")[0],
    fileUrl: "#",
    usageStats: {
      totalViews: 203,
      activeUsers: 11,
      completionRate: 0,
      lastAccessed: new Date().toISOString().split("T")[0],
    },
  },
  {
    id: 2,
    title: "API Reference",
    description: "Detailed API endpoints and parameters.",
    tags: "docs,api,reference",
    category: "Reference",
    date: new Date().toISOString().split("T")[0],
    fileUrl: "#",
    usageStats: {
      totalViews: 157,
      activeUsers: 7,
      completionRate: 0,
      lastAccessed: new Date().toISOString().split("T")[0],
    },
  },
]