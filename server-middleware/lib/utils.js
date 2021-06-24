export function wrapAsync(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  }
};

export function wrapAsyncForm(handler) {
  return (req, res, next) => {
    const isXhr = req.headers['x-requested-with'] === 'XMLHttpRequest';

    // Monkey patch redirects
    if (isXhr) {
      res.redirect = (url) => {
        res.send({redirectUrl: url});
      };
    }

    wrapAsync(handler)(req, res, (error) => {
      if (error && isXhr) {
        res.status(500).send(error.toJSON());
      } else {
        next(error);
      }
    });
  }
};
