module.exports = (req, res, next) => {
  let title = req.body?.title;
  let body = req.body?.body;

  if(!title || !body) return res.status(400).json({ message: 'Title or body is empty!' });
  else if(title.length > 100) return res.status(400).json({ message: 'Title is too long!' });
  else if(body.length > 3000) return res.status(400).json({ message: 'Text is too long!' });

  // Replace multiple whitespace characters with a single space
  title = title.replace(/\s+/g, ' ');

  // Create a preview, replace multiple line breaks with a single one
  req.preview = body.replace(/\n\s*\n/g, '\n').slice(0, 300);

  next();
}