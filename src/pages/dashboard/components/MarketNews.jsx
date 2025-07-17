import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MarketNews = () => {
  const newsItems = [
    {
      id: 1,
      title: "Federal Reserve Signals Potential Rate Cut in Q2 2025",
      summary: "Fed Chair Powell hints at monetary policy adjustment amid cooling inflation data and stable employment metrics.",
      source: "Financial Times",
      time: "2 hours ago",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
      category: "Monetary Policy"
    },
    {
      id: 2,
      title: "Tech Sector Rallies on Strong Q1 Earnings Outlook",
      summary: "Major technology companies report better-than-expected guidance, driving sector-wide optimism.",
      source: "Bloomberg",
      time: "4 hours ago",
      image: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?w=400&h=200&fit=crop",
      category: "Earnings"
    },
    {
      id: 3,
      title: "ESG Investment Flows Reach Record High in 2025",
      summary: "Sustainable investing attracts $2.3 trillion globally as institutional investors prioritize climate goals.",
      source: "Reuters",
      time: "6 hours ago",
      image: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=400&h=200&fit=crop",
      category: "ESG"
    },
    {
      id: 4,
      title: "Emerging Markets Show Resilience Amid Global Uncertainty",
      summary: "Asian and Latin American markets outperform developed counterparts in volatile trading environment.",
      source: "Wall Street Journal",
      time: "8 hours ago",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=200&fit=crop",
      category: "Global Markets"
    },
    {
      id: 5,
      title: "Cryptocurrency Regulation Framework Proposed by SEC",
      summary: "New guidelines aim to provide clarity for institutional crypto adoption while maintaining investor protection.",
      source: "CNBC",
      time: "10 hours ago",
      image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?w=400&h=200&fit=crop",
      category: "Regulation"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Monetary Policy': 'bg-primary/10 text-primary',
      'Earnings': 'bg-success/10 text-success',
      'ESG': 'bg-accent/10 text-accent',
      'Global Markets': 'bg-warning/10 text-warning',
      'Regulation': 'bg-secondary/10 text-secondary'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Newspaper" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Market News</h3>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      
      <div className="divide-y divide-border">
        {newsItems.map((item) => (
          <article key={item.id} className="p-4 hover:bg-muted/20 transition-colors cursor-pointer">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-sm text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
                
                <h4 className="text-sm font-medium text-foreground mb-2 line-clamp-2">
                  {item.title}
                </h4>
                
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {item.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    {item.source}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name="Bookmark" size={14} />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Icon name="Share" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors font-medium">
          Load More News
        </button>
      </div>
    </div>
  );
};

export default MarketNews;