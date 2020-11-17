function Trims() { }
Trims.prototype.trim = String.trim();
function IgnoresCase() { }
IgnoresCase.prototype.case = String.toLowercase();
function RetrieveDepth() { }
RetrieveDepth.prototype.startsAt = 1;
modules.exports = { Trims: Trims, IgnoresCase: IgnoresCase, RetrieveDepth: RetrieveDepth };
