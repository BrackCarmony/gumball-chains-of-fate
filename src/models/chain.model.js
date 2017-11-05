// chain-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const chain = new Schema({
    title: { type: String, required: true },
    gumballs:[{type:Schema.Types.ObjectId, ref:'gumball'}],
    reward:{ type: String},
    category:{ type: String},
  }, {
    timestamps: true
  });

  return mongooseClient.model('chain', chain);
};
