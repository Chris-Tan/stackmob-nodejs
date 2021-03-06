// Generated by CoffeeScript 1.3.1
var StackMob, jsOAuth, _, _makeOAuthAjaxCall;

StackMob = require("./stackmob-0.9.2").StackMob;

_ = require('lodash');

jsOAuth = void 0;

_makeOAuthAjaxCall = function(model, params, method) {
  var defaultError, defaultSuccess, error, hash, success;
  success = params["success"];
  defaultSuccess = function(response, options) {
    var result;
    if (_.isFunction(params["stackmob_on" + method])) {
      params["stackmob_on" + method]();
    }
    if (response.text) {
      result = JSON.parse(response.text);
      console.log(response);
      if (params["stackmob_count"] === true) {
        _.extend(response, {
          getAllResponseHeaders: function() {},
          getResponseHeader: function(name) {
            return response.responseHeaders[name.toLowerCase()];
          }
        });
        return success(response);
      } else if (model.clear) {
        model.clear();
        if (!model.set(result)) {
          return false;
        }
        return success(model);
      } else {
        return success(result);
      }
    } else {
      return success();
    }
  };
  params["success"] = defaultSuccess;
  error = params["error"];
  defaultError = function(response) {
    var result;
    result = (response.text ? JSON.parse(response.text) : response);
    return (function(m, d) {
      return error(m, d);
    }).call(StackMob, model, result);
  };
  params["error"] = defaultError;
  hash = {};
  hash["url"] = params["url"];
  hash["headers"] = params["headers"];
  hash["success"] = params["success"];
  hash["failure"] = params["error"];
  hash["method"] = params["type"];
  hash["data"] = params["data"];
  if (_.include(["PUT", "POST"], hash["method"])) {
    hash["headers"]["Content-Type"] = "application/json";
  }
  return jsOAuth != null ? jsOAuth.request(hash) : void 0;
};

_.extend(StackMob, {
  initStart: function(options) {
    options.ajax = _makeOAuthAjaxCall;
    return jsOAuth = require("./jsOAuth-1.3.3").OAuth(options);
  }
});

module.exports = StackMob;
