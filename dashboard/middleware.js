export function validateUser(req, res, next) {
  const key = req.cookies.get('key');
  if (key)
    return next();
  return res.redirect('errors/401');
}