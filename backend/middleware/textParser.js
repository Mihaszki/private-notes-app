module.exports = (req, res, next) => {
  const title = req.body?.title;
  const body = req.body?.body;

  if(!req) res.status(400).json({ message: 'Title or body is empty!' });

  // Replace multiple whitespace characters with a single space
  (req.body.title) ? req.body.title = req.body.title.replace(/\s+/g, ' ') : req.body.title = '';

  // Create a preview, replace multiple line breaks with a single one
  (req.body.body) ? req.preview = req.body.body.replace(/\n\s*\n/g, '\n').slice(0, 300) + '...' : req.body.body = '';

  if(!req.body.body || !req.body.title) return res.status(400).json({ message: 'Title or body is empty!' });

  next();
}