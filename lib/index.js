/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Create a readable stream from an iterator.
*
* @module @stdlib/streams-node-from-iterator
*
* @example
* var inspectStream = require( '@stdlib/streams-node-inspect-sink' );
* var randu = require( '@stdlib/random-iter-randu' );
* var iteratorStream = require( '@stdlib/streams-node-from-iterator' );
*
* function log( chunk ) {
*    console.log( chunk.toString() );
* }
*
* var opts = {
*     'iter': 10
* };
*
* var stream = iteratorStream( randu( opts ) );
*
* stream.pipe( inspectStream( log ) );
*
* @example
* var randu = require( '@stdlib/random-iter-randu' );
* var iteratorStream = require( '@stdlib/streams-node-from-iterator' );
*
* var opts = {
*     'sep': ',',
*     'objectMode': false,
*     'encoding': 'utf8',
*     'highWaterMark': 64
* };
*
* var createStream = iteratorStream.factory( opts );
*
* // Create 10 identically configured streams...
* var streams = [];
* var i;
* for ( i = 0; i < 10; i++ ) {
*     streams.push( createStream( randu() ) );
* }
*
* @example
* var inspectStream = require( '@stdlib/streams-node-inspect-sink' );
* var randu = require( '@stdlib/random-iter-randu' );
* var iteratorStream = require( '@stdlib/streams-node-from-iterator' );
*
* function log( v ) {
*    console.log( v );
* }
*
* var opts = {
*     'iter': 10
* };
*
* var stream = iteratorStream.objectMode( randu( opts ) );
*
* stream.pipe( inspectStream.objectMode( log ) );
*/


// MODULES //

var setReadOnly = require( '@stdlib/utils-define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var objectMode = require( './object_mode.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'objectMode', objectMode );
setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;
