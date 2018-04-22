var Common = {};

Common.normalizeDateTime = function (date) {
    return date.replace('/-/','/').replace('T',' ');
};


module.exports = Common;