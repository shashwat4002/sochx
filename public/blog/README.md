# SochX Blog System

## 📝 How to Add a New Blog Post

### Method 1: Using the Admin Panel (Recommended)

1. Navigate to `/blog/admin` in your browser
2. Enter the admin passcode: `sochx4002`
3. Fill in the blog post details:
   - **Title**: Your blog post title
   - **Author**: Author name (defaults to Shashwat Mishra)
   - **Content**: Your blog content (supports HTML tags)
4. Click "Generate & Download JSON"
5. Upload the downloaded JSON file to `/public/blog/posts/`
6. Add the filename to `/public/blog/posts/index.json`

### Method 2: Manual JSON Creation

Create a new JSON file in `/public/blog/posts/` with this structure:

```json
{
  "title": "Your Blog Post Title",
  "author": "Your Name",
  "date": "2025-10-13",
  "content": "<p>Your content here. You can use HTML tags.</p>"
}
```

Then add the filename to `/public/blog/posts/index.json`:

```json
[
  "existing-post.json",
  "your-new-post.json"
]
```

## 🎨 Content Formatting

You can use HTML tags in your content:

- `<p>` for paragraphs
- `<h2>` for subheadings
- `<strong>` for bold text
- `<ul>` and `<li>` for lists
- `<br>` for line breaks
- `<a href="">` for links

## 🔒 Admin Access

- Admin URL: `/blog/admin` (not linked publicly)
- Passcode: `sochx4002`
- Change the passcode in `/src/pages/BlogAdmin.tsx` if needed

## 📁 File Structure

```
/public/blog/
├── posts/
│   ├── index.json              (list of all post filenames)
│   ├── post-slug-1.json        (individual blog posts)
│   └── post-slug-2.json
```

## 🚀 Deployment

When you push changes to your repository, Netlify will automatically deploy:
- New blog posts added to `/public/blog/posts/`
- Updates to `index.json`

No additional configuration needed!
