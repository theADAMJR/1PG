import mongoose from 'mongoose';

export const SavedGuild = mongoose.model('guild', new mongoose.Schema({
  _id: String,
  prefix: { type: String, default: '.' },
}));
