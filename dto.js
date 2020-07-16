function dto() {
  var _referenceData, _payload;
}

dto.prototype = {
  getReferenceData : () => { return _referenceData; },
  setReferenceData : (value) => { _referenceData = value; },
}

module.exports = new dto();