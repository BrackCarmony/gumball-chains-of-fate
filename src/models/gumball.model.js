// gumball-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const gumball = new Schema({
    name: { type: String, required: true },
    faction:{ type: String },
    image:{ type: String },
  }, {
    timestamps: true
  });

  return mongooseClient.model('gumball', gumball);
};
