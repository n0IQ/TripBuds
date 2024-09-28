import Review from '../models/ReviewModel.js';
import * as factory from './handlerFactory.js';

export const setTourUserId = (req, res, next) => {
  // Allow Nested Review
  if (!req.body.tour) req.body.tour = req.params.tourId;
  req.body.user = req.user.id;
  next();
};

export const getAllReviews = factory.getAll(Review);
export const getReview = factory.getOne(Review);
export const createReview = factory.createOne(Review);
export const updateReview = factory.updateOne(Review);
export const deleteReview = factory.deleteOne(Review);
