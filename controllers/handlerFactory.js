import ApiFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // Allow for nested reviews on Tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagenation();

    // const doc = await features.query.explain();
    const doc = await features.query;

    const modelName = Model.modelName.toLowerCase();

    // Send Response
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        [modelName]: doc,
      },
    });
  });

const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;

    const modelName = Model.modelName.toLowerCase();
    if (!doc) {
      return next(new AppError(`No ${modelName} found with that ID`, 404));
    }

    res.json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });

const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    const modelName = Model.modelName.toLowerCase();

    res.status(201).json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No ${modelName} found with that ID`, 404));
    }

    const modelName = Model.modelName.toLowerCase();

    res.status(200).json({
      status: 'success',
      data: {
        [modelName]: doc,
      },
    });
  });

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No Document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export { getAll, getOne, createOne, updateOne, deleteOne };
