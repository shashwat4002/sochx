import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogPost {
  title: string;
  author: string;
  date: string;
  content: string;
  slug: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch('/blog/posts/index.json');
        const postFiles = await response.json();
        
        const loadedPosts = await Promise.all(
          postFiles.map(async (file: string) => {
            const res = await fetch(`/blog/posts/${file}`);
            const post = await res.json();
            return { ...post, slug: file.replace('.json', '') };
          })
        );
        
        setPosts(loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">SochX Blog</h1>
          <p className="text-muted-foreground text-lg">
            Insights on democratizing research access for students
          </p>
        </div>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No blog posts yet.</p>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.slug} className="p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-bold mb-2">
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} • {post.author}
                </p>
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="secondary">Read More</Button>
                </Link>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
