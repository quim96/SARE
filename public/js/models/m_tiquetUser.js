var TiquetModel = Backbone.Model.extend({
    urlRoot: "/api/users/self/tiquets"
});
// Return the model for the module
module.exports = TiquetModel;
