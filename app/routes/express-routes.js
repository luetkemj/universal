import render from '../controllers/render.controller';

module.exports = (router) => {
  // if at this point we don't have a route match for /api, return 404
  router.route('/api/*').all((req, res) => res.status(404).send({
    error: `route not found: ${req.url}`,
  }));

  // all other routes are handled by our render (html) controller
  router.route('*').all(render);
};
