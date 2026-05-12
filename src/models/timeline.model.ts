import mongoose from 'mongoose';

const MemoriesUrlsSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
});

const TimelineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  memoriesUrls: {
    type: [MemoriesUrlsSchema],
    default: [],
    required: true,
  },
});

const TimelineModel = mongoose.model('Timeline', TimelineSchema);

export default TimelineModel;
