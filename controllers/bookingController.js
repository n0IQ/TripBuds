import Stripe from 'stripe';
import Booking from '../models/bookingModel.js';
import Tour from '../models/tourModel.js';
import catchAsync from '../utils/catchAsync.js';
import * as factory from './handlerFactory.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourId
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
          },
        },
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'Tour has been successfully booked',
    session,
  });
});

export const createBookingCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query;

  if (!tour || !user || !price) {
    return next();
  }

  await Booking.create({ tour, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});

export const createBooking = factory.createOne(Booking);

export const getBooking = factory.getOne(Booking);

export const getAllBooking = factory.getAll(Booking);

export const updateBooking = factory.updateOne(Booking);

export const deleteBooking = factory.deleteOne(Booking);
