import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ADMIN_PASSCODE = "sochx4002";

const BlogAdmin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Shashwat Mishra");
  const [content, setContent] = useState("");

  const handleLogin = () => {
    if (passcode === ADMIN_PASSCODE) {
      setAuthenticated(true);
      toast.success("Authenticated successfully!");
    } else {
      toast.error("Incorrect passcode!");
    }
  };

  const handlePublish = () => {
    if (!title || !content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const date = new Date().toISOString().split('T')[0];
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    const postData = {
      title,
      author,
      date,
      content: content.replace(/\n/g, '<br>')
    };

    const blob = new Blob([JSON.stringify(postData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${slug}.json`;
    link.click();

    toast.success("JSON file downloaded! Upload it to /public/blog/posts/ and add the filename to index.json");
    
    setTitle("");
    setContent("");
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Blog Admin Login</h1>
          <div className="space-y-4">
            <div>
              <Label htmlFor="passcode">Admin Passcode</Label>
              <Input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter passcode"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog post title"
              />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
              />
            </div>

            <div>
              <Label htmlFor="content">Content (HTML or plain text) *</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Blog post content. You can use HTML tags like <p>, <h2>, <strong>, etc."
                rows={15}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={handlePublish} className="w-full" size="lg">
              Generate & Download JSON
            </Button>

            <p className="text-sm text-muted-foreground">
              After downloading, upload the JSON file to <code className="bg-muted px-1 py-0.5 rounded">/public/blog/posts/</code> and add the filename to <code className="bg-muted px-1 py-0.5 rounded">index.json</code>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BlogAdmin;
