
import React, { useState } from 'react';
import { Share2, Activity, Award, MessageSquare, Heart, Send, BadgeCheck, ShieldAlert, Wallet, Filter, Search } from 'lucide-react';
import { User, Post, Comment } from '../types';

interface SocialfyProps {
  currentUser: User;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: {
      id: 'u2',
      name: 'Visal Bong',
      role: 'USER',
      avatar: 'https://picsum.photos/seed/2/40',
      isVerified: false
    },
    title: 'Does parametric insurance really payout automatically?',
    content: 'My coffee shop in Tuol Kork gets flooded every year. I am skeptical about the "auto-payout" claim. Has anyone actually received money without filing paperwork?',
    category: 'Advice',
    timestamp: '2 hours ago',
    likes: 12,
    comments: [
      {
        id: 'c1',
        author: {
           id: 'a1',
           name: 'Forte Insurance Support',
           role: 'AGENCY',
           avatar: 'https://picsum.photos/seed/forte/40',
           companyName: 'Forte Insurance'
        },
        text: 'Hello Visal. Yes, our Parametric Flood Smart Contract uses rainfall data from verified weather stations. If the threshold is met, the blockchain triggers the transaction to your Smart Wallet instantly. No manual claim form is needed.',
        timestamp: '1 hour ago',
        isOfficialResponse: true
      },
      {
        id: 'c2',
        author: {
          id: 'u3',
          name: 'Chan Tola',
          role: 'USER',
          avatar: 'https://picsum.photos/seed/3/40',
        },
        text: 'I can confirm this. Last October, I got the notification and the funds in my ELIXIR wallet 2 hours after the storm stopped.',
        timestamp: '45 mins ago'
      }
    ]
  },
  {
    id: 'p2',
    author: {
      id: 'u4',
      name: 'Bopha Devi',
      role: 'USER',
      avatar: 'https://picsum.photos/seed/4/40',
      isVerified: false
    },
    title: 'New User: Which plan for a freelancer?',
    content: 'I have no steady income but want health coverage. The options are confusing. Any recommendations?',
    category: 'General',
    timestamp: '5 hours ago',
    likes: 5,
    comments: []
  }
];

export const Socialfy: React.FC<SocialfyProps> = ({ currentUser }) => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [commentText, setCommentText] = useState<Record<string, string>>({});

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: currentUser,
      title: newPostTitle,
      content: newPostContent,
      category: 'General',
      timestamp: 'Just now',
      likes: 0,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
  };

  const handleAddComment = (postId: string) => {
    const text = commentText[postId];
    if (!text?.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: currentUser,
      text: text,
      timestamp: 'Just now',
      isOfficialResponse: currentUser.role === 'AGENCY'
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));

    setCommentText({ ...commentText, [postId]: '' });
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 md:space-y-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <div className="flex items-center space-x-2 mb-1 text-emerald-600">
             <Activity size={20} />
             <span className="font-bold text-sm tracking-wider uppercase">Trust Bridge</span>
           </div>
           <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Socialfy</h1>
           <p className="text-sm md:text-base text-slate-500">The Verified Community for Insurance Answers.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-auto">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <input 
             type="text" 
             placeholder="Search past concerns..." 
             className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Create Post Widget */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
             <h3 className="font-bold text-slate-700 mb-4">Post a Concern</h3>
             <input 
                type="text" 
                className="w-full mb-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="Topic (e.g., Claim Delay, Policy Question)"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
             />
             <textarea 
                className="w-full mb-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-24 text-sm"
                placeholder={`Describe your issue or question, ${currentUser.name.split(' ')[0]}. Verified experts will respond.`}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
             />
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex gap-2 text-xs text-slate-400 items-center">
                   <ShieldAlert size={14} />
                   <span>Responses are monitored for accuracy.</span>
                </div>
                <button 
                  onClick={handleCreatePost}
                  disabled={!newPostTitle || !newPostContent}
                  className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Post
                </button>
             </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="p-4 md:p-6">
                    {/* Post Header */}
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex items-center gap-3">
                          <img src={post.author.avatar} className="w-10 h-10 rounded-full" alt="avatar" />
                          <div>
                             <div className="flex items-center gap-1 flex-wrap">
                                <span className="font-bold text-slate-800 text-sm md:text-base">{post.author.name}</span>
                                {post.author.isVerified && <BadgeCheck size={16} className="text-white fill-blue-500" />}
                                {post.author.role === 'AGENCY' && <span className="text-[10px] bg-blue-100 text-blue-600 px-1 rounded font-bold">AGENCY</span>}
                             </div>
                             <p className="text-xs text-slate-400">{post.timestamp} • {post.category}</p>
                          </div>
                       </div>
                       <button className="text-slate-300 hover:text-slate-600"><Share2 size={18} /></button>
                    </div>

                    {/* Content */}
                    <h3 className="font-bold text-base md:text-lg text-slate-800 mb-2">{post.title}</h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">{post.content}</p>
                    
                    {/* Action Bar */}
                    <div className="flex items-center gap-6 border-t border-slate-50 pt-4">
                       <button className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-colors text-sm font-medium">
                          <Heart size={18} /> {post.likes} Helpful
                       </button>
                       <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-500 transition-colors text-sm font-medium">
                          <MessageSquare size={18} /> {post.comments.length} Replies
                       </button>
                    </div>
                 </div>

                 {/* Comments Section */}
                 <div className="bg-slate-50 p-4 md:p-6 border-t border-slate-100">
                    {post.comments.length > 0 && (
                      <div className="space-y-4 mb-6">
                        {post.comments.map(comment => (
                          <div key={comment.id} className={`flex gap-3 ${comment.isOfficialResponse ? 'bg-indigo-50 p-3 md:p-4 rounded-xl border border-indigo-100 shadow-sm' : ''}`}>
                             <img src={comment.author.avatar} className="w-8 h-8 rounded-full flex-shrink-0" alt="avatar" />
                             <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                   <span className={`font-bold text-sm ${comment.isOfficialResponse ? 'text-indigo-800' : 'text-slate-800'}`}>{comment.author.name}</span>
                                   {comment.isOfficialResponse && (
                                     <span className="flex items-center gap-1 text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                                       <BadgeCheck size={10} /> Verified Expert
                                     </span>
                                   )}
                                   <span className="text-xs text-slate-400">{comment.timestamp}</span>
                                </div>
                                <p className={`text-sm ${comment.isOfficialResponse ? 'text-indigo-900' : 'text-slate-700'}`}>{comment.text}</p>
                             </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Comment Input */}
                    <div className="flex items-center gap-3">
                       <img src={currentUser.avatar} className="w-8 h-8 rounded-full hidden sm:block" alt="my avatar" />
                       <div className="flex-1 relative">
                          <input 
                            type="text" 
                            className="w-full px-4 py-2 pr-10 rounded-full bg-white border border-slate-200 text-sm focus:outline-none focus:border-indigo-400"
                            placeholder={currentUser.role === 'AGENCY' ? "Write an official response..." : "Join the discussion..."}
                            value={commentText[post.id] || ''}
                            onChange={(e) => setCommentText({...commentText, [post.id]: e.target.value})}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                          />
                          <button 
                            onClick={() => handleAddComment(post.id)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-full transition-colors"
                          >
                             <Send size={14} />
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Column: Leaderboard & Info */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <Award className="absolute -bottom-4 -right-4 opacity-20" size={120} />
              <h3 className="font-bold text-lg mb-2 relative z-10">Refer & Earn</h3>
              <p className="text-indigo-100 text-sm relative z-10 mb-4">
                 Help build the community. Share your unique code and earn 500 ELX Tokens when a friend buys their first policy.
              </p>
              <div className="bg-white/10 rounded-lg p-2 flex justify-between items-center relative z-10 border border-white/20">
                 <span className="font-mono font-bold tracking-widest text-sm">ELX-8821</span>
                 <button className="text-xs font-bold bg-white text-indigo-600 px-2 py-1 rounded">COPY</button>
              </div>
           </div>

           <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hidden lg:block">
              <h3 className="font-bold text-slate-800 mb-4">Verified Agencies Online</h3>
              <div className="space-y-3">
                 <div className="flex items-center gap-3">
                    <img src="https://picsum.photos/seed/forte/40" className="w-10 h-10 rounded-full" />
                    <div>
                       <div className="flex items-center gap-1">
                          <p className="font-bold text-sm text-slate-800">Forte Insurance</p>
                          <BadgeCheck size={14} className="text-white fill-blue-500" />
                       </div>
                       <p className="text-xs text-green-600 font-medium">Active Now</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 opacity-60">
                    <img src="https://picsum.photos/seed/aia/40" className="w-10 h-10 rounded-full grayscale" />
                    <div>
                       <div className="flex items-center gap-1">
                          <p className="font-bold text-sm text-slate-800">AIA Life</p>
                          <BadgeCheck size={14} className="text-white fill-blue-500" />
                       </div>
                       <p className="text-xs text-slate-400">Offline</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
