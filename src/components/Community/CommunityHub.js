import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiMessageCircle, FiHeart, FiBookmark, FiShare2 } from 'react-icons/fi';
import './CommunityHub.css';
import debounce from 'lodash/debounce';  // Keep this import

const CommunityHub = () => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('trending');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Enhanced dummy posts with more engaging content
  const dummyPosts = [
    {
      id: 1,
      author: {
        name: "Sarah Parker",
        avatar: "/images/avatars/sarah.png",
        expertise: "Master Gardener 🌿"
      },
      title: "🌟 Revolutionary Vertical Garden Success: 50+ Plants in 10 sq ft!",
      content: "Just transformed my tiny balcony into a lush paradise! Using innovative hydroponics and smart space management, I'm now growing over 50 varieties of plants in just 10 square feet. Complete guide with step-by-step instructions below...",
      image: "/images/posts/vertical-garden.png",
      tags: ["#VerticalGardening", "#SmallSpaceMiracles", "#UrbanJungle"],
      likes: 1234,
      comments: 145,
      timeAgo: "2h ago",
      featured: true,
      badgeType: 'innovation',
      badgeText: 'Innovation Award 🚀'
    },
    {
      id: 2,
      author: {
        name: "Dr. James Chen",
        avatar: "/images/avatars/james.png",
        expertise: "Plant Scientist 🔬"
      },
      title: "🎉 Breakthrough: Made My Orchids Rebloom 5 Times a Year!",
      content: "After 3 years of research, I've cracked the code! My orchid care technique has achieved consistent reblooming every 10 weeks. The secret lies in a special nutrient mix and light cycle...",
      image: "/images/posts/orchid-success.png",
      tags: ["#OrchidWhisperer", "#PlantScience", "#Breakthrough"],
      likes: 892,
      comments: 234,
      timeAgo: "4h ago",
      featured: true,
      badgeType: 'research',
      badgeText: 'Research Spotlight 🔬'
    },
    {
      id: 3,
      author: {
        name: "Maya Patel",
        avatar: "/images/avatars/maya.png",
        expertise: "Urban Farming Expert 🌱"
      },
      title: "💡 Revolutionizing Food Security: My 500 sq ft Rooftop Farm Feeds 50 Families!",
      content: "Excited to share my 1-year journey of transforming a barren rooftop into a thriving urban farm! Using vertical systems, aquaponics, and smart irrigation, we're now producing 200kg of vegetables monthly. Full blueprint and cost analysis included...",
      image: "/images/posts/rooftop-farm.png",
      tags: ["#UrbanFarming", "#FoodSecurity", "#SustainableLiving"],
      likes: 3456,
      comments: 428,
      timeAgo: "6h ago",
      featured: true,
      badgeType: 'urban',
      badgeText: 'Urban Pioneer 🌆'
    },
    {
      id: 4,
      author: {
        name: "Prof. Elena Rodriguez",
        avatar: "/images/avatars/elena.png",
        expertise: "Plant Genetics Researcher 🧬"
      },
      title: "🧪 Breakthrough: Natural Method to Double Plant Growth Rate!",
      content: "After 5 years of research, we've discovered a completely organic way to significantly boost plant growth using beneficial microorganisms. Our test gardens showed 97% success rate across 30 different plant species...",
      image: "/images/posts/lab-research.png",
      tags: ["#PlantScience", "#OrganicGrowth", "#Research"],
      likes: 2891,
      comments: 367,
      timeAgo: "12h ago",
      featured: true,
      badgeType: 'research',
      badgeText: 'Research Spotlight 🔬'
    },
    {
      id: 5,
      author: {
        name: "Kai Yamamoto",
        avatar: "/images/avatars/kai.png",
        expertise: "Bonsai Master 🎋"
      },
      title: "🌳 Ancient Bonsai Secrets: 400-Year-Old Tree Restoration Success!",
      content: "Sharing the detailed process of how we restored a dying 400-year-old Bonsai using a blend of traditional Japanese techniques and modern science. Time-lapse footage and step-by-step guide included...",
      image: "/images/posts/bonsai-restoration.png",
      tags: ["#BonsaiArt", "#PlantRestoration", "#JapaneseGardening"],
      likes: 4567,
      comments: 892,
      timeAgo: "1d ago",
      featured: true,
      badgeType: 'traditional',
      badgeText: 'Master Class 🎋'
    },
    {
      id: 6,
      author: {
        name: "Dr. Aisha Rahman",
        avatar: "/images/avatars/aisha.png",
        expertise: "Desert Agriculture Specialist 🏜️"
      },
      title: "🌵 Desert Miracle: Growing Tropical Plants in the Sahara!",
      content: "Breakthrough in desert agriculture! Our innovative water harvesting and soil enhancement technique has successfully grown tropical fruits in the Sahara. Complete methodology and 3-year data analysis included...",
      image: "/images/posts/desert-garden.png",
      tags: ["#DesertGreening", "#Innovation", "#Sustainability"],
      likes: 5432,
      comments: 743,
      timeAgo: "2d ago",
      featured: true,
      badgeType: 'breakthrough',
      badgeText: 'Desert Pioneer 🏜️'
    },
    {
      id: 7,
      author: {
        name: "Thomas Berg",
        avatar: "/images/avatars/thomas.png",
        expertise: "AI & Plant Care Innovator 🤖"
      },
      title: "🎯 New AI Model Predicts Plant Diseases 2 Weeks Before Visible Symptoms!",
      content: "Excited to announce our AI system can now detect plant diseases 14 days before visible symptoms appear, with 99.2% accuracy! Free app launch next month. Early access sign-up available...",
      image: "/images/posts/ai-detection.png",
      tags: ["#ArtificialIntelligence", "#PlantHealth", "#Innovation"],
      likes: 6789,
      comments: 934,
      timeAgo: "3d ago",
      featured: true,
      badgeType: 'tech',
      badgeText: 'AI Innovation 🤖'
    },
    {
      id: 8,
      author: {
        name: "Maria Silva",
        avatar: "/images/avatars/maria.png",
        expertise: "Rainforest Conservation Expert 🌴"
      },
      title: "🌎 Revolutionary: 100,000 Trees Planted Using Drone Swarms!",
      content: "Our team just completed the largest drone-based reforestation project! Using AI-guided drone swarms, we planted 100,000 trees in just 48 hours. Impact analysis and future scaling plans included...",
      image: "/images/posts/drone-planting.png",
      tags: ["#Reforestation", "#DroneTechnology", "#ClimateAction"],
      likes: 8901,
      comments: 1023,
      timeAgo: "4d ago",
      featured: true,
      badgeType: 'conservation',
      badgeText: 'Earth Guardian 🌍'
    },
    {
      id: 9,
      author: {
        name: "Dr. Zhang Wei",
        avatar: "/images/avatars/zhang.png",
        expertise: "Plant Biochemist 🧪"
      },
      title: "🌿 Discovered: Ancient Chinese Herbs Can Purify Air 10x Better Than Modern Plants!",
      content: "Groundbreaking research reveals certain ancient Chinese medicinal plants have exceptional air purification capabilities. Our study shows they remove pollutants 10 times more effectively than common air-purifying plants...",
      image: "/images/posts/chinese-herbs.png",
      tags: ["#AirPurification", "#TraditionalMedicine", "#Research"],
      likes: 7654,
      comments: 867,
      timeAgo: "5d ago",
      featured: true,
      badgeType: 'traditional',
      badgeText: 'Ancient Wisdom 🌿'
    },
    {
      id: 10,
      author: {
        name: "Isabella Romano",
        avatar: "/images/avatars/isabella.png",
        expertise: "Vertical Farming Architect 🏗️"
      },
      title: "🌆 World's First Underground Mushroom City Produces 5 Tons Weekly!",
      content: "Just completed the world's largest underground mushroom farming facility! Converting abandoned subway tunnels into high-tech farming spaces. Full architectural plans and environmental impact study included...",
      image: "/images/posts/underground-farm.png",
      tags: ["#UrbanAgriculture", "#Innovation", "#FoodProduction"],
      likes: 9876,
      comments: 1234,
      timeAgo: "6d ago",
      featured: true,
      badgeType: 'urban',
      badgeText: 'Urban Innovator 🏗️'
    }
  ];

  // Enhanced PostCard component with 2D effects
  const PostCard = ({ post }) => (
    <motion.div 
      className="post-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {post.featured && (
        <div className={`featured-badge ${post.badgeType || 'default'}`}>
          {post.badgeText || 'Featured 🌟'}
        </div>
      )}
      
      <div className="post-header">
        <div className="author-info">
          <img src={post.author.avatar} alt={post.author.name} className="author-avatar" />
          <div>
            <h3>{post.author.name}</h3>
            <span className="expertise-badge">{post.author.expertise}</span>
          </div>
        </div>
        <span className="time-ago">{post.timeAgo}</span>
      </div>

      {post.image && (
        <div className="post-image">
          <img src={post.image} alt={post.title} />
        </div>
      )}

      <div className="post-content">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        
        <div className="tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="post-actions">
        <motion.button 
          className="action-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            whileHover={{ color: "#ff4b4b" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
          >
            <FiHeart /> {post.likes}
          </motion.div>
        </motion.button>
        
        <motion.button 
          className="action-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            whileHover={{ color: "#4b6bff" }}
          >
            <FiMessageCircle /> {post.comments}
          </motion.div>
        </motion.button>

        <motion.button 
          className="action-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            whileHover={{ color: "#ffd700" }}
          >
            <FiBookmark />
          </motion.div>
        </motion.button>

        <motion.button 
          className="action-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            whileHover={{ color: "#00c853" }}
          >
            <FiShare2 />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );

  // Use useEffect to filter posts when search query changes
  useEffect(() => {
    const filtered = dummyPosts.filter(post => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.author.name.toLowerCase().includes(searchTerm) ||
        post.author.expertise.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    });
    setFilteredPosts(filtered);
  }, [searchQuery]);

  // Search handler
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Debounced search using lodash's debounce
  const debouncedSearch = debounce(handleSearch, 300);

  return (
    <div className="community-hub">
      <div className="hub-header">
        <div className="hub-title">
          <h1>Community Hub</h1>
          <p>Connect, Share, and Grow with Fellow Plant Enthusiasts</p>
        </div>
        
        <button 
          className="create-post-button"
          onClick={() => setShowCreatePost(true)}
        >
          Create Post
        </button>
      </div>

      <div className="hub-navigation">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'trending' ? 'active' : ''}`}
            onClick={() => setActiveTab('trending')}
          >
            <FiTrendingUp /> Trending
          </button>
          <button 
            className={`nav-tab ${activeTab === 'latest' ? 'active' : ''}`}
            onClick={() => setActiveTab('latest')}
          >
            <FiMessageCircle /> Latest
          </button>
          <button 
            className={`nav-tab ${activeTab === 'following' ? 'active' : ''}`}
            onClick={() => setActiveTab('following')}
          >
            <FiUsers /> Following
          </button>
        </div>

        <div className="search-filter">
          <input 
            type="search" 
            placeholder="Search posts..."
            className="search-input"
            onChange={debouncedSearch}
            defaultValue={searchQuery}
          />
          {searchQuery && (
            <div className="search-results-count">
              Found {filteredPosts.length} results
            </div>
          )}
        </div>
      </div>

      <div className="posts-grid">
        {(searchQuery ? filteredPosts : dummyPosts).map(post => (
          <PostCard key={post.id} post={post} />
        ))}
        {searchQuery && filteredPosts.length === 0 && (
          <div className="no-results">
            <h3>No posts found</h3>
            <p>Try different keywords or check your spelling</p>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div 
            className="create-post-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Add your create post form here */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommunityHub;
