/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var RelayCacheProcessor = require.requireActual('RelayCacheProcessor');

// This is horrible, but don't have an idea how to do it differently :(
global.calls = global.calls || {}

RelayCacheProcessor.prototype.originalVisitNode = RelayCacheProcessor.prototype.visitNode;
RelayCacheProcessor.prototype.visitNode = jest.fn(function(node, dataID, nextState) {
  calls['visitNode'] = calls['visitNode'] || []
  calls['visitNode'].push(node.constructor.name)
  RelayCacheProcessor.a = 1
  return this.originalVisitNode.apply(this, arguments)
});
RelayCacheProcessor.getCalls = function() { return calls };
RelayCacheProcessor.clearCalls = function() { global.calls = {} }

module.exports = RelayCacheProcessor
