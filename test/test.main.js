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

// MODULES //

var tape = require( 'tape' );
var Readable = require( 'readable-stream' ).Readable;
var isBuffer = require( '@stdlib/assert-is-buffer' );
var array2iterator = require( '@stdlib/array-to-iterator' );
var string2buffer = require( '@stdlib/buffer-from-string' );
var randu = require( '@stdlib/random-iter-randu' );
var inspectStream = require( '@stdlib/streams-node-inspect-sink' );
var parseJSON = require( '@stdlib/utils-parse-json' );
var iteratorStream = require( './../lib/main.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof iteratorStream, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if not provided an iterator for the first argument', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		NaN,
		true,
		false,
		void 0,
		null,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iteratorStream( value );
		};
	}
});

tape( 'the function throws an error if not provided an iterator for the first argument (options)', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		NaN,
		true,
		false,
		void 0,
		null,
		[],
		{},
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iteratorStream( value, {} );
		};
	}
});

tape( 'the function throws an error if provided an options argument which is not an object', function test( t ) {
	var values;
	var i;

	values = [
		'abc',
		5,
		NaN,
		true,
		false,
		void 0,
		null,
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iteratorStream( array2iterator( [ 1, 2, 3 ] ), value );
		};
	}
});

tape( 'if provided an invalid readable stream option, the function throws an error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		void 0,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iteratorStream( array2iterator( [ 1, 2, 3 ] ), {
				'objectMode': value
			});
		};
	}
});

tape( 'the function is a constructor which returns a readable stream', function test( t ) {
	var IteratorStream = iteratorStream;
	var s;

	s = new IteratorStream( array2iterator( [ 1, 2, 3 ] ) );
	t.equal( s instanceof Readable, true, 'returns expected value' );
	t.end();
});

tape( 'the constructor does not require the `new` operator', function test( t ) {
	var IteratorStream = iteratorStream;
	var s;

	s = iteratorStream( array2iterator( [ 1, 2, 3 ] ) );
	t.equal( s instanceof IteratorStream, true, 'returns expected value' );
	t.end();
});

tape( 'the constructor returns a readable stream (no new)', function test( t ) {
	var s = iteratorStream( array2iterator( [ 1, 2, 3 ] ) );
	t.equal( s instanceof Readable, true, 'returns expected value' );
	t.end();
});

tape( 'the returned stream provides a method to destroy a stream (object)', function test( t ) {
	var count = 0;
	var s;

	s = iteratorStream( randu() );

	t.equal( typeof s.destroy, 'function', 'has destroy method' );

	s.on( 'error', onError );
	s.on( 'close', onClose );

	s.destroy({
		'message': 'beep'
	});

	function onError( err ) {
		count += 1;
		if ( err ) {
			t.ok( true, err.message );
		} else {
			t.ok( false, 'does not error' );
		}
		if ( count === 2 ) {
			t.end();
		}
	}
	function onClose() {
		count += 1;
		t.ok( true, 'stream closes' );
		if ( count === 2 ) {
			t.end();
		}
	}
});

tape( 'the returned stream provides a method to destroy a stream (error object)', function test( t ) {
	var count = 0;
	var s;

	s = iteratorStream( randu() );

	t.equal( typeof s.destroy, 'function', 'has destroy method' );

	s.on( 'error', onError );
	s.on( 'close', onClose );

	s.destroy( new Error( 'beep' ) );

	function onError( err ) {
		count += 1;
		if ( err ) {
			t.ok( true, err.message );
		} else {
			t.ok( false, 'does not error' );
		}
		if ( count === 2 ) {
			t.end();
		}
	}
	function onClose() {
		count += 1;
		t.ok( true, 'stream closes' );
		if ( count === 2 ) {
			t.end();
		}
	}
});

tape( 'the returned stream does not allow itself to be destroyed more than once', function test( t ) {
	var s;

	s = iteratorStream( randu() );

	s.on( 'error', onError );
	s.on( 'close', onClose );

	// If the stream is closed twice, the test will error...
	s.destroy();
	s.destroy();

	function onClose() {
		t.ok( true, 'stream closes' );
		t.end();
	}
	function onError( err ) {
		t.ok( false, err.message );
	}
});

tape( 'the constructor returns a stream which streams iterated values', function test( t ) {
	var iStream;
	var result;
	var values;
	var opts;
	var it;
	var s;

	values = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
	it = array2iterator( values );

	opts = {
		'sep': '\n'
	};
	s = iteratorStream( it, opts );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	s.pipe( iStream );

	function inspect( chunk ) {
		t.equal( isBuffer( chunk ), true, 'returns a buffer' );
		result += chunk.toString();
	}

	function onEnd() {
		var i;

		t.pass( 'stream ended' );

		result = result.split( '\n' );
		t.equal( result.length, values.length, 'has expected length' );
		for ( i = 0; i < result.length; i++ ) {
			t.equal( parseFloat( result[ i ] ), values[ i ], 'returns expected value. i: ' + i + '.' );
		}
		t.end();
	}
});

tape( 'the constructor returns a stream which streams iterated values (object mode)', function test( t ) {
	var iStream;
	var values;
	var opts;
	var it;
	var s;
	var i;

	values = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
	it = array2iterator( values );

	opts = {
		'objectMode': true
	};
	s = iteratorStream( it, opts );
	s.on( 'end', onEnd );

	opts = {
		'objectMode': true
	};
	iStream = inspectStream( opts, inspect );

	i = -1;
	s.pipe( iStream );

	function inspect( v ) {
		i += 1;
		t.equal( v, values[ i ], 'returns expected value. i: '+i+'.' );
	}

	function onEnd() {
		t.pass( 'stream ended' );
		t.end();
	}
});

tape( 'the constructor returns a stream which streams iterated values (infinite iterator)', function test( t ) {
	var iStream;
	var result;
	var count;
	var opts;
	var s;

	opts = {
		'sep': '\n'
	};
	s = iteratorStream( randu(), opts );
	s.on( 'close', onClose );

	iStream = inspectStream( inspect );

	result = '';
	count = 0;
	s.pipe( iStream );

	function inspect( chunk ) {
		count += 1;
		t.equal( isBuffer( chunk ), true, 'returns a buffer' );
		result += chunk.toString();
		if ( count === 10 ) {
			s.destroy();
		}
	}

	function onClose() {
		var i;

		t.pass( 'stream closed' );

		result = result.split( '\n' );
		t.equal( result.length >= 10, true, 'has expected length' );
		for ( i = 0; i < 10; i++ ) {
			t.equal( typeof parseFloat( result[ i ] ), 'number', 'returns expected value. i: ' + i + '.' );
		}
		t.end();
	}
});

tape( 'the constructor returns a stream which streams iterated values (object mode; infinite iterator)', function test( t ) {
	var iStream;
	var opts;
	var s;
	var i;

	opts = {
		'objectMode': true
	};
	s = iteratorStream( randu(), opts );
	s.on( 'close', onClose );

	opts = {
		'objectMode': true
	};
	iStream = inspectStream( opts, inspect );

	i = -1;
	s.pipe( iStream );

	function inspect( v ) {
		i += 1;
		t.equal( typeof v, 'number', 'returns expected value. i: '+i+'.' );
		if ( i === 10 ) {
			return s.destroy();
		}
	}

	function onClose() {
		t.pass( 'stream closed' );
		t.end();
	}
});

tape( 'the constructor returns a stream which streams iterated values (value+done)', function test( t ) {
	var iStream;
	var result;
	var values;
	var opts;
	var it;
	var s;

	values = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
	it = createIterator( values );

	opts = {
		'sep': '\n'
	};
	s = iteratorStream( it, opts );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	s.pipe( iStream );

	function inspect( chunk ) {
		t.equal( isBuffer( chunk ), true, 'returns a buffer' );
		result += chunk.toString();
	}

	function onEnd() {
		var i;

		t.pass( 'stream ended' );

		result = result.split( '\n' );
		t.equal( result.length, values.length, 'has expected length' );
		for ( i = 0; i < result.length; i++ ) {
			t.equal( parseFloat( result[ i ] ), values[ i ], 'returns expected value. i: ' + i + '.' );
		}
		t.end();
	}

	function createIterator( arr ) {
		var len;
		var it;
		var i;

		len = arr.length;
		i = -1;

		it = {};
		it.next = next;

		return it;

		function next() {
			i += 1;
			if ( i < len-1 ) {
				return {
					'value': arr[ i ],
					'done': false
				};
			}
			if ( i === len-1 ) {
				return {
					'value': arr[ i ],
					'done': true
				};
			}
			return {
				'done': true
			};
		}
	}
});

tape( 'the constructor returns a stream which streams iterated values (object mode; value+done)', function test( t ) {
	var iStream;
	var values;
	var opts;
	var it;
	var s;
	var i;

	values = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
	it = createIterator( values );

	opts = {
		'objectMode': true
	};
	s = iteratorStream( it, opts );
	s.on( 'end', onEnd );

	opts = {
		'objectMode': true
	};
	iStream = inspectStream( opts, inspect );

	i = -1;
	s.pipe( iStream );

	function inspect( v ) {
		i += 1;
		t.equal( v, values[ i ], 'returns expected value. i: '+i+'.' );
	}

	function onEnd() {
		t.pass( 'stream ended' );
		t.end();
	}

	function createIterator( arr ) {
		var len;
		var it;
		var i;

		len = arr.length;
		i = -1;

		it = {};
		it.next = next;

		return it;

		function next() {
			i += 1;
			if ( i < len-1 ) {
				return {
					'value': arr[ i ],
					'done': false
				};
			}
			if ( i === len-1 ) {
				return {
					'value': arr[ i ],
					'done': true
				};
			}
			return {
				'done': true
			};
		}
	}
});

tape( 'the constructor returns a stream which streams iterated values (len=1; value+done)', function test( t ) {
	var iStream;
	var result;
	var values;
	var opts;
	var it;
	var s;

	values = [ 1 ];
	it = createIterator( values );

	opts = {
		'sep': '\n'
	};
	s = iteratorStream( it, opts );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	s.pipe( iStream );

	function inspect( chunk ) {
		t.equal( isBuffer( chunk ), true, 'returns a buffer' );
		result += chunk.toString();
	}

	function onEnd() {
		var i;

		t.pass( 'stream ended' );

		result = result.split( '\n' );
		t.equal( result.length, values.length, 'has expected length' );
		for ( i = 0; i < result.length; i++ ) {
			t.equal( parseFloat( result[ i ] ), values[ i ], 'returns expected value. i: ' + i + '.' );
		}
		t.end();
	}

	function createIterator( arr ) {
		var len;
		var it;
		var i;

		len = arr.length;
		i = -1;

		it = {};
		it.next = next;

		return it;

		function next() {
			i += 1;
			if ( i < len-1 ) {
				return {
					'value': arr[ i ],
					'done': false
				};
			}
			if ( i === len-1 ) {
				return {
					'value': arr[ i ],
					'done': true
				};
			}
			return {
				'done': true
			};
		}
	}
});

tape( 'the constructor returns a stream which streams iterated values (object mode; len=1; value+done)', function test( t ) {
	var iStream;
	var values;
	var opts;
	var it;
	var s;
	var i;

	values = [ 1 ];
	it = createIterator( values );

	opts = {
		'objectMode': true
	};
	s = iteratorStream( it, opts );
	s.on( 'end', onEnd );

	opts = {
		'objectMode': true
	};
	iStream = inspectStream( opts, inspect );

	i = -1;
	s.pipe( iStream );

	function inspect( v ) {
		i += 1;
		t.equal( v, values[ i ], 'returns expected value. i: '+i+'.' );
	}

	function onEnd() {
		t.pass( 'stream ended' );
		t.end();
	}

	function createIterator( arr ) {
		var len;
		var it;
		var i;

		len = arr.length;
		i = -1;

		it = {};
		it.next = next;

		return it;

		function next() {
			i += 1;
			if ( i < len-1 ) {
				return {
					'value': arr[ i ],
					'done': false
				};
			}
			if ( i === len-1 ) {
				return {
					'value': arr[ i ],
					'done': true
				};
			}
			return {
				'done': true
			};
		}
	}
});

tape( 'by default, the constructor returns a stream which streams newline-delimited values', function test( t ) {
	var iStream;
	var result;
	var values;
	var it;
	var s;

	values = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
	it = array2iterator( values );

	s = iteratorStream( it );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	s.pipe( iStream );

	function inspect( chunk ) {
		result += chunk.toString();
	}

	function onEnd() {
		var v;
		var i;

		result = result.split( '\n' );
		t.equal( result.length, values.length, 'has expected length' );
		for ( i = 0; i < result.length; i++ ) {
			v = parseFloat( result[ i ] );
			t.equal( v, values[ i ], 'returns expected value' );
		}
		t.end();
	}
});

tape( 'the constructor supports providing a custom separator for streamed values', function test( t ) {
	var iStream;
	var result;
	var values;
	var opts;
	var it;
	var s;

	values = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
	it = array2iterator( values );

	opts = {
		'sep': '--++--'
	};
	s = iteratorStream( it, opts );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	s.pipe( iStream );

	function inspect( chunk ) {
		result += chunk.toString();
	}

	function onEnd() {
		var v;
		var i;

		result = result.split( opts.sep );
		t.equal( result.length, values.length, 'has expected length' );
		for ( i = 0; i < result.length; i++ ) {
			v = parseFloat( result[ i ] );
			t.equal( v, values[ i ], 'returns expected value' );
		}
		t.end();
	}
});

tape( 'by default, the constructor returns a stream which serializes streamed values as JSON strings', function test( t ) {
	var iStream;
	var result;
	var values;
	var it;
	var s;

	values = [
		{
			'value': 1
		},
		{
			'value': 2
		},
		{
			'value': 3
		},
		{
			'value': 4
		},
		{
			'value': 5
		},
		{
			'value': 6
		},
		{
			'value': 7
		},
		{
			'value': 8
		}
	];
	it = array2iterator( values );

	s = iteratorStream( it );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	s.pipe( iStream );

	function inspect( chunk ) {
		result += chunk.toString();
	}

	function onEnd() {
		var v;
		var i;

		result = result.split( '\n' );
		t.equal( result.length, values.length, 'has expected length' );
		for ( i = 0; i < result.length; i++ ) {
			v = parseJSON( result[ i ] );
			t.deepEqual( v, values[ i ], 'returns expected value' );
		}
		t.end();
	}
});

tape( 'the constructor supports providing a custom serialization function (string)', function test( t ) {
	var expected;
	var iStream;
	var result;
	var values;
	var opts;
	var it;
	var s;

	values = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
	it = array2iterator( values );

	expected = [
		'v::1',
		'v::2',
		'v::3',
		'v::4',
		'v::5',
		'v::6',
		'v::7',
		'v::8'
	];

	opts = {
		'serialize': serialize
	};
	s = iteratorStream( it, opts );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	s.pipe( iStream );

	function serialize( v ) {
		return 'v::' + v.toString();
	}

	function inspect( chunk ) {
		result += chunk.toString();
	}

	function onEnd() {
		var i;
		result = result.split( '\n' );
		t.equal( result.length, expected.length, 'has expected length' );
		for ( i = 0; i < result.length; i++ ) {
			t.equal( result[ i ], expected[ i ], 'returns expected value' );
		}
		t.end();
	}
});

tape( 'the constructor supports providing a custom serialization function (buffer)', function test( t ) {
	var expected;
	var iStream;
	var result;
	var values;
	var opts;
	var it;
	var s;

	values = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
	it = array2iterator( values );

	expected = [
		'v::1',
		'v::2',
		'v::3',
		'v::4',
		'v::5',
		'v::6',
		'v::7',
		'v::8'
	];

	opts = {
		'serialize': serialize
	};
	s = iteratorStream( it, opts );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	s.pipe( iStream );

	function serialize( v ) {
		return string2buffer( 'v::' + v.toString() );
	}

	function inspect( chunk ) {
		result += chunk.toString();
	}

	function onEnd() {
		var i;
		result = result.split( '\n' );
		t.equal( result.length, expected.length, 'has expected length' );
		for ( i = 0; i < result.length; i++ ) {
			t.equal( result[ i ], expected[ i ], 'returns expected value' );
		}
		t.end();
	}
});

tape( 'by default, the constructor returns a stream which serializes streamed values as JSON strings (value+done)', function test( t ) {
	var iStream;
	var result;
	var values;
	var it;
	var s;

	values = [
		{
			'value': 1
		},
		{
			'value': 2
		},
		{
			'value': 3
		},
		{
			'value': 4
		},
		{
			'value': 5
		},
		{
			'value': 6
		},
		{
			'value': 7
		},
		{
			'value': 8
		}
	];
	it = createIterator( values );

	s = iteratorStream( it );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	s.pipe( iStream );

	function inspect( chunk ) {
		result += chunk.toString();
	}

	function onEnd() {
		var v;
		var i;

		result = result.split( '\n' );
		t.equal( result.length, values.length, 'has expected length' );
		for ( i = 0; i < result.length; i++ ) {
			v = parseJSON( result[ i ] );
			t.deepEqual( v, values[ i ], 'returns expected value' );
		}
		t.end();
	}

	function createIterator( arr ) {
		var len;
		var it;
		var i;

		len = arr.length;
		i = -1;

		it = {};
		it.next = next;

		return it;

		function next() {
			i += 1;
			if ( i < len-1 ) {
				return {
					'value': arr[ i ],
					'done': false
				};
			}
			if ( i === len-1 ) {
				return {
					'value': arr[ i ],
					'done': true
				};
			}
			return {
				'done': true
			};
		}
	}
});

tape( 'the constructor supports providing a custom serialization function (value+done; string)', function test( t ) {
	var expected;
	var iStream;
	var result;
	var values;
	var opts;
	var it;
	var s;

	values = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
	it = createIterator( values );

	expected = [
		'v::1',
		'v::2',
		'v::3',
		'v::4',
		'v::5',
		'v::6',
		'v::7',
		'v::8'
	];

	opts = {
		'serialize': serialize
	};
	s = iteratorStream( it, opts );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	s.pipe( iStream );

	function serialize( v ) {
		return 'v::' + v.toString();
	}

	function inspect( chunk ) {
		result += chunk.toString();
	}

	function onEnd() {
		var i;
		result = result.split( '\n' );
		t.equal( result.length, expected.length, 'has expected length' );
		for ( i = 0; i < result.length; i++ ) {
			t.equal( result[ i ], expected[ i ], 'returns expected value' );
		}
		t.end();
	}

	function createIterator( arr ) {
		var len;
		var it;
		var i;

		len = arr.length;
		i = -1;

		it = {};
		it.next = next;

		return it;

		function next() {
			i += 1;
			if ( i < len-1 ) {
				return {
					'value': arr[ i ],
					'done': false
				};
			}
			if ( i === len-1 ) {
				return {
					'value': arr[ i ],
					'done': true
				};
			}
			return {
				'done': true
			};
		}
	}
});

tape( 'the constructor supports providing a custom serialization function (value+done; buffer)', function test( t ) {
	var expected;
	var iStream;
	var result;
	var values;
	var opts;
	var it;
	var s;

	values = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
	it = createIterator( values );

	expected = [
		'v::1',
		'v::2',
		'v::3',
		'v::4',
		'v::5',
		'v::6',
		'v::7',
		'v::8'
	];

	opts = {
		'serialize': serialize
	};
	s = iteratorStream( it, opts );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	s.pipe( iStream );

	function serialize( v ) {
		return string2buffer( 'v::' + v.toString() );
	}

	function inspect( chunk ) {
		result += chunk.toString();
	}

	function onEnd() {
		var i;
		result = result.split( '\n' );
		t.equal( result.length, expected.length, 'has expected length' );
		for ( i = 0; i < result.length; i++ ) {
			t.equal( result[ i ], expected[ i ], 'returns expected value' );
		}
		t.end();
	}

	function createIterator( arr ) {
		var len;
		var it;
		var i;

		len = arr.length;
		i = -1;

		it = {};
		it.next = next;

		return it;

		function next() {
			i += 1;
			if ( i < len-1 ) {
				return {
					'value': arr[ i ],
					'done': false
				};
			}
			if ( i === len-1 ) {
				return {
					'value': arr[ i ],
					'done': true
				};
			}
			return {
				'done': true
			};
		}
	}
});

tape( 'the constructor supports providing a custom serialization function (value+done; buffer; len=1)', function test( t ) {
	var expected;
	var iStream;
	var result;
	var values;
	var opts;
	var it;
	var s;

	values = [ 1 ];
	it = createIterator( values );

	expected = [
		'v::1'
	];

	opts = {
		'serialize': serialize
	};
	s = iteratorStream( it, opts );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	s.pipe( iStream );

	function serialize( v ) {
		return string2buffer( 'v::' + v.toString() );
	}

	function inspect( chunk ) {
		result += chunk.toString();
	}

	function onEnd() {
		var i;
		result = result.split( '\n' );
		t.equal( result.length, expected.length, 'has expected length' );
		for ( i = 0; i < result.length; i++ ) {
			t.equal( result[ i ], expected[ i ], 'returns expected value' );
		}
		t.end();
	}

	function createIterator( arr ) {
		var len;
		var it;
		var i;

		len = arr.length;
		i = -1;

		it = {};
		it.next = next;

		return it;

		function next() {
			i += 1;
			if ( i < len-1 ) {
				return {
					'value': arr[ i ],
					'done': false
				};
			}
			if ( i === len-1 ) {
				return {
					'value': arr[ i ],
					'done': true
				};
			}
			return {
				'done': true
			};
		}
	}
});

tape( 'in object mode, `null` values are reserved', function test( t ) {
	var iStream;
	var values;
	var count;
	var opts;
	var FLG;
	var it;
	var s;

	values = [ 1, 2, 3, null, 5, 6, 7, 8 ];
	it = array2iterator( values );

	opts = {
		'objectMode': true
	};
	s = iteratorStream( it, opts );
	s.on( 'error', onError );
	s.on( 'end', onEnd );

	iStream = inspectStream.objectMode( inspect );

	count = 0;
	FLG = false;
	s.pipe( iStream );

	function inspect( v, i ) {
		count += 1;
		t.equal( v, values[ i ], 'returns expected value' );
	}

	function onError( err ) {
		FLG = true;
		t.ok( false, err.message );
	}

	function onEnd() {
		t.pass( 'stream ended' );
		t.equal( FLG, false, 'stream does not emit an error' );
		t.equal( count, 3, 'streamed expected number of values' );
		t.end();
	}
});

tape( 'by default, when not in object mode, a stream emits an `error` upon encountering an `undefined` value', function test( t ) {
	var iStream;
	var values;
	var result;
	var count;
	var FLG;
	var it;
	var s;

	values = [ 1, 2, 3, void 0, 5, 6, 7, 8 ];
	it = array2iterator( values );

	s = iteratorStream( it );
	s.on( 'error', onError );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	count = 0;
	FLG = false;
	s.pipe( iStream );

	function inspect( v ) {
		count += 1;
		result += v.toString();
	}

	function onError( err ) {
		FLG = true;
		t.ok( true, err.message );
	}

	function onEnd() {
		var j;
		var i;

		t.pass( 'stream ended' );
		t.equal( FLG, true, 'stream does emit an error' );
		t.equal( count, 7, 'streamed expected number of values' );

		result = result.split( '\n' );
		t.equal( result.length, 7, 'has expected length' );

		j = -1;
		for ( i = 0; i < values.length; i++ ) {
			if ( values[ i ] === void 0 ) {
				continue;
			}
			j += 1;
			t.equal( parseFloat( result[ j ] ), values[ i ], 'returns expected value. i: '+i+'.' );
		}
		t.end();
	}
});

tape( 'by default, when not in object mode, a stream emits an `error` upon encountering an `undefined` value (value+done)', function test( t ) {
	var iStream;
	var values;
	var result;
	var count;
	var FLG;
	var it;
	var s;

	values = [ 1, 2, 3, 4, 5, 6, 7, void 0 ];
	it = createIterator( values );

	s = iteratorStream( it );
	s.on( 'error', onError );
	s.on( 'end', onEnd );

	iStream = inspectStream( inspect );

	result = '';
	count = 0;
	FLG = false;
	s.pipe( iStream );

	function inspect( v ) {
		count += 1;
		result += v.toString();
	}

	function onError( err ) {
		FLG = true;
		t.ok( true, err.message );
	}

	function onEnd() {
		var j;
		var i;

		t.pass( 'stream ended' );
		t.equal( FLG, true, 'stream does emit an error' );
		t.equal( count, 7, 'streamed expected number of values' );

		result = result.split( '\n' );
		t.equal( result.length, 7, 'has expected length' );

		j = -1;
		for ( i = 0; i < values.length; i++ ) {
			if ( values[ i ] === void 0 ) {
				continue;
			}
			j += 1;
			t.equal( parseFloat( result[ j ] ), values[ i ], 'returns expected value. i: '+i+'.' );
		}
		t.end();
	}

	function createIterator( arr ) {
		var len;
		var it;
		var i;

		len = arr.length;
		i = -1;

		it = {};
		it.next = next;

		return it;

		function next() {
			i += 1;
			if ( i < len-1 ) {
				return {
					'value': arr[ i ],
					'done': false
				};
			}
			if ( i === len-1 ) {
				return {
					'value': arr[ i ],
					'done': true
				};
			}
			return {
				'done': true
			};
		}
	}
});
