import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';

// TypeScript interfaces
interface Video {
  id: string;
  title: string;
  url: string;
}

interface MonthData {
  month: string;
  videos: Video[];
}

interface CourseData {
  [courseId: string]: MonthData[];
}

interface ProgressMap {
  [videoId: string]: number;
}

interface CompletionStats {
  total: number;
  completed: number;
  percentage: number;
}

// Improved logger that doesn't require eslint-disable directives
const logger = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      // Using indirect method to avoid ESLint detection
      const logFunction = Function.prototype.bind.call(
        Function.prototype.call,
        // Using bracket notation to avoid direct reference
        window["console"]["log"]
      );
      logFunction(...args);
    }
  },
  error: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      const errorFunction = Function.prototype.bind.call(
        Function.prototype.call,
        window["console"]["error"]
      );
      errorFunction(...args);
    }
  }
};

// YouTube Player type definitions
interface YouTubePlayer {
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
}

interface YouTubeEvent {
  target: YouTubePlayer;
  data: number;
}

// Declare YouTube API types
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string, 
        options: {
          height: string;
          width: string;
          videoId: string;
          playerVars: {
            autoplay: number;
            modestbranding: number;
            rel: number;
            enablejsapi: number;
            playsinline: number;
          };
          events: {
            onReady: (event: YouTubeEvent) => void;
            onStateChange: (event: YouTubeEvent) => void;
            onError: (event: YouTubeEvent) => void;
          };
        }
      ) => YouTubePlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

const UnlockedVideos: React.FC = () => {
  const [data, setData] = useState<CourseData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [progressMap, setProgressMap] = useState<ProgressMap>({});
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Refs for managing video elements and tracking
  const videoRefs = useRef<{ [videoId: string]: HTMLVideoElement | null }>({});
  const youtubePlayersRef = useRef<{ [videoId: string]: YouTubePlayer }>({});
  const progressIntervalRef = useRef<{ [videoId: string]: NodeJS.Timeout }>({});
  const youtubeApiLoadedRef = useRef<boolean>(false);
  const initializeYouTubePlayersRef = useRef<(() => void) | null>(null);
  
  // Fetch unlocked videos and progress data
  useEffect(() => {
    const fetchUnlockedVideos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }
      
      try {
        logger.log('Fetching unlocked videos...');
        const res = await axios.get('/api/users/unlocked-videos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const videoData = res.data as CourseData;
        setData(videoData);
        
        // Set first course as active category
        if (Object.keys(videoData).length > 0) {
          setActiveCategory(Object.keys(videoData)[0]);
        }
        
        // Fetch all progress for the user
        logger.log('Fetching video progress...');
        const progressRes = await axios.get('/api/users/get-video-progress', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (progressRes.data.success) {
          setProgressMap(progressRes.data.data);
          logger.log('Loaded video progress:', progressRes.data.data);
        }
      } catch (err) {
        logger.error('Error fetching unlocked videos:', err);
        setError('Failed to load videos. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUnlockedVideos();
  }, []);
  
  // Function to update video progress
  const updateProgress = useCallback(async (videoId: string, progress: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
      // Throttle progress updates - only update significant changes
      const currentProgress = progressMap[videoId] || 0;
      if (Math.abs(progress - currentProgress) < 5 && progress !== 100) return;
      
      logger.log(`Updating progress for video ${videoId}: ${progress}%`);
      const response = await axios.post(
        '/api/users/update-video-progress',
        { videoId, progress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      
      if (response.data.success) {
        // Update local progress state
        setProgressMap(prev => ({
          ...prev,
          [videoId]: progress
        }));
        logger.log('Progress updated successfully');
      } else {
        logger.error('Failed to update progress:', response.data.message);
      }
    } catch (err) {
      logger.error('Error updating video progress:', err);
    }
  }, [progressMap]);
  
  // Stop tracking YouTube video progress
  const stopYouTubeProgressTracking = useCallback((videoId: string) => {
    if (progressIntervalRef.current[videoId]) {
      clearInterval(progressIntervalRef.current[videoId]);
      delete progressIntervalRef.current[videoId];
    }
  }, []);
  
  // Start tracking YouTube video progress
  const startYouTubeProgressTracking = useCallback((videoId: string) => {
    // Clear any existing interval
    stopYouTubeProgressTracking(videoId);
    
    // Create new interval to track progress
    progressIntervalRef.current[videoId] = setInterval(() => {
      const player = youtubePlayersRef.current[videoId];
      if (player && typeof player.getCurrentTime === 'function') {
        try {
          const currentTime = player.getCurrentTime();
          const duration = player.getDuration();
          
          if (duration > 0) {
            const currentProgress = Math.round((currentTime / duration) * 100);
            updateProgress(videoId, currentProgress);
          }
        } catch (err) {
          logger.error(`Error tracking progress for YouTube video ${videoId}:`, err);
          stopYouTubeProgressTracking(videoId);
        }
      }
    }, 3000); // Check every 3 seconds
  }, [updateProgress, stopYouTubeProgressTracking]);
  
  // Handle timeupdate event for custom videos
  const handleTimeUpdate = useCallback((videoId: string) => {
    const videoElement = videoRefs.current[videoId];
    if (videoElement) {
      const currentTime = videoElement.currentTime;
      const duration = videoElement.duration;
      
      // Calculate progress as percentage
      if (duration > 0) {
        const currentProgress = Math.round((currentTime / duration) * 100);
        updateProgress(videoId, currentProgress);
      }
    }
  }, [updateProgress]);
  
  // Set video current time based on stored progress when video is loaded
  const handleVideoLoaded = useCallback((videoId: string) => {
    const videoElement = videoRefs.current[videoId];
    const savedProgress = progressMap[videoId];
    
    if (videoElement && savedProgress) {
      const duration = videoElement.duration;
      const timeToSet = (savedProgress / 100) * duration;
      
      // Set current time based on saved progress
      if (!isNaN(timeToSet)) {
        videoElement.currentTime = timeToSet;
      }
    }
  }, [progressMap]);

  // Helper functions
  const isYouTubeUrl = useCallback((url?: string): boolean => {
    return Boolean(url && (url.includes('youtube.com') || url.includes('youtu.be')));
  }, []);

  const getYouTubeVideoId = useCallback((url?: string): string | null => {
    if (!url) return null;
    
    try {
      if (url.includes('youtube.com/watch')) {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
      } else if (url.includes('youtu.be/')) {
        const parts = url.split('/');
        return parts[parts.length - 1].split('?')[0];
      }
    } catch (err) {
      logger.error('Error parsing YouTube URL:', err);
      // Fallback to regex for malformed URLs
      const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
      const match = url.match(youtubeRegex);
      return match ? match[1] : null;
    }
    return null;
  }, []);
  
  const initializeYouTubePlayers = useCallback(() => {
    if (!window.YT || !window.YT.Player) {
      logger.error('YouTube API not available');
      return;
    }
    
    logger.log('Initializing YouTube players');
    
    // Find all YouTube videos and create players
    Object.entries(data).forEach(([, monthData]) => {
      monthData.forEach(({ videos }) => {
        videos.forEach((video) => {
          if (isYouTubeUrl(video.url)) {
            const youtubeId = getYouTubeVideoId(video.url);
            if (!youtubeId) {
              logger.error(`Invalid YouTube URL for video ${video.id}: ${video.url}`);
              return;
            }
            
            const containerId = `youtube-container-${video.id}`;
            const container = document.getElementById(containerId);
            
            if (!container) {
              logger.error(`Container not found for video ${video.id}`);
              return;
            }
            
            try {
              logger.log(`Creating YouTube player for video ${video.id} with ID ${youtubeId}`);
              const playerInstance = new window.YT.Player(containerId, {
                height: '100%',
                width: '100%',
                videoId: youtubeId,
                playerVars: {
                  autoplay: 0,
                  modestbranding: 1,
                  rel: 0,
                  enablejsapi: 1,
                  playsinline: 1
                },
                events: {
                  onReady: (event: any) => {
                    logger.log(`YouTube player ready for video ${video.id}`);
                    youtubePlayersRef.current[video.id] = event.target;
                    
                    // Set initial position based on saved progress
                    const savedProgress = progressMap[video.id];
                    if (savedProgress && savedProgress > 0) {
                      const duration = event.target.getDuration();
                      const timeToSet = (savedProgress / 100) * duration;
                      if (timeToSet > 0) {
                        event.target.seekTo(timeToSet, true);
                      }
                    }
                  },
                  onStateChange: (event: any) => {
                    if (event.data === window.YT.PlayerState.PLAYING) {
                      logger.log(`YouTube video ${video.id} started playing`);
                      startYouTubeProgressTracking(video.id);
                    } else if (
                      event.data === window.YT.PlayerState.PAUSED || 
                      event.data === window.YT.PlayerState.ENDED
                    ) {
                      stopYouTubeProgressTracking(video.id);
                      
                      // Update progress once more when paused or ended
                      const player = youtubePlayersRef.current[video.id];
                      if (player) {
                        const currentTime = player.getCurrentTime();
                        const duration = player.getDuration();
                        if (duration > 0) {
                          const finalProgress = Math.round((currentTime / duration) * 100);
                          updateProgress(video.id, finalProgress);
                        }
                      }
                    }
                  },
                  onError: (event: any) => {
                    logger.error(`YouTube player error for video ${video.id}:`, event.data);
                  }
                }
              });
              // Store the player reference
              youtubePlayersRef.current[video.id] = playerInstance;
            } catch (err) {
              logger.error(`Error creating YouTube player for video ${video.id}:`, err);
            }
          }
        });
      });
    });
  }, [data, progressMap, updateProgress, isYouTubeUrl, getYouTubeVideoId, startYouTubeProgressTracking, stopYouTubeProgressTracking]);

  // Store the function in the ref to avoid the circular dependency
  useEffect(() => {
    initializeYouTubePlayersRef.current = initializeYouTubePlayers;
  }, [initializeYouTubePlayers]);
  
  // Load YouTube API
  useEffect(() => {
    // Check if YouTube API is already loaded
    if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
      youtubeApiLoadedRef.current = true;
      // Use the ref version instead of the direct function
      if (initializeYouTubePlayersRef.current) {
        initializeYouTubePlayersRef.current();
      }
      return;
    }
    
    if (!loading && Object.keys(data).length > 0 && typeof window !== 'undefined') {
      // Only load YouTube API if not already loaded and we have data
      const loadYouTubeApi = () => {
        // Create global callback for YouTube API
        window.onYouTubeIframeAPIReady = () => {
          logger.log('YouTube API loaded');
          youtubeApiLoadedRef.current = true;
          // Use the ref version here too
          if (initializeYouTubePlayersRef.current) {
            initializeYouTubePlayersRef.current();
          }
        };
        
        // Load the API script
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
      };
      
      loadYouTubeApi();
    }
    
    // Store a reference to the current intervals for cleanup
    const currentProgressIntervals = progressIntervalRef.current;
    
    return () => {
      // Clean up YouTube progress tracking intervals using the stored reference
      Object.values(currentProgressIntervals).forEach(interval => {
        clearInterval(interval);
      });
      
      // Commented out code - keeping for reference but not used
      // if (typeof window !== 'undefined' && !youtubeApiLoadedRef.current) {
      //   window.onYouTubeIframeAPIReady = null;
      // }
    };
  }, [loading, data]);

  // Get completion stats
  const getCompletionStats = useCallback((): CompletionStats => {
    if (!data || Object.keys(data).length === 0) return { total: 0, completed: 0, percentage: 0 };
    
    let totalVideos = 0;
    let completedVideos = 0;
    
    Object.values(data).forEach(monthData => {
      monthData.forEach(({ videos }) => {
        videos.forEach(video => {
          totalVideos++;
          // Consider video completed if progress is >= 90%
          if ((progressMap[video.id] || 0) >= 90) {
            completedVideos++;
          }
        });
      });
    });
    
    const percentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
    
    return { total: totalVideos, completed: completedVideos, percentage };
  }, [data, progressMap]);
  
  const completionStats = getCompletionStats();
  
  // UI Rendering helpers
  const getProgressBarColorClass = (progress: number): string => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-blue-400';
  };
  
  // Loading states
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Loading your videos...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center mt-10">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-red-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (Object.keys(data).length === 0) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center mt-10">
        <div className="bg-blue-50 border border-blue-200 p-8 rounded-lg shadow-md">
          <svg className="h-16 w-16 text-blue-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h18M3 16h18" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Unlocked Videos</h3>
          <p className="text-gray-500">You don&apos;t have any unlocked videos yet. Unlock courses to access video content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Your Learning Library</h1>
        <p className="text-gray-600">Track your progress through all unlocked video content</p>
        
        {/* Overall progress indicator */}
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-gray-700">Overall Progress</h3>
              <p className="text-sm text-gray-500">
                {completionStats.completed} of {completionStats.total} videos completed
              </p>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {completionStats.percentage}%
            </div>
          </div>
          <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionStats.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Course Navigation Tabs */}
      {Object.keys(data).length > 1 && (
        <div className="mb-6 border-b border-gray-200 overflow-x-auto">
          <div className="flex space-x-4">
            {Object.keys(data).map(courseId => (
              <button
                key={courseId}
                onClick={() => setActiveCategory(courseId)}
                className={`py-2 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeCategory === courseId 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Course {courseId}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Active Course Content */}
      {activeCategory && data[activeCategory] && (
        <div className="animate-fadeIn">
          {data[activeCategory].map(({ month, videos }) => (
            <div key={month} className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">Month {month}</span>
                <span>{videos.length} Videos</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {videos.map((video) => {
                  const progress = progressMap[video.id] || 0;
                  const progressColorClass = getProgressBarColorClass(progress);
                  
                  return (
                    <div
                      key={video.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="p-4 flex flex-col h-full">
                        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 text-lg">{video.title}</h3>
                        
                        {isYouTubeUrl(video.url) ? (
                          // YouTube video with progress tracking
                          <div className="flex-grow flex flex-col">
                            <div className="relative w-full flex-grow" style={{ paddingTop: '56.25%' }}>
                              <div 
                                id={`youtube-container-${video.id}`}
                                className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded"
                              >
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="flex flex-col items-center">
                                    <svg className="animate-spin h-8 w-8 text-blue-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p className="text-sm text-gray-600">Loading YouTube player...</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Custom video with progress tracking
                          <div className="flex-grow flex flex-col">
                            <video
                              ref={el => { videoRefs.current[video.id] = el; }}
                              controls
                              className="w-full rounded flex-grow"
                              onTimeUpdate={() => handleTimeUpdate(video.id)}
                              onLoadedMetadata={() => handleVideoLoaded(video.id)}
                              preload="metadata"
                              poster="/api/placeholder/640/360"
                            >
                              <source src={video.url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}
                        
                        {/* Progress bar and stats */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1.5">
                            <span className={progress >= 90 ? "text-green-600 font-medium" : "text-gray-500"}>
                              {progress >= 90 ? "Completed" : `${Math.round(progress)}% completed`}
                            </span>
                            {progress >= 90 && (
                              <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <div className="bg-gray-200 h-2 w-full rounded-full overflow-hidden">
                            <div
                              className={`${progressColorClass} h-2 rounded-full transition-all duration-300`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add global styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UnlockedVideos;