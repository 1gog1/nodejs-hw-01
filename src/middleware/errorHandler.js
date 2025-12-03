import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('Error handler:', err);

  if (err instanceof createHttpError.HttpError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: 'Internal server error',
  });
};
