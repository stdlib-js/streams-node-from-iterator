<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# Iterator Stream

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Create a [readable stream][readable-stream] from an [iterator][mdn-iterator-protocol].



<section class="usage">

## Usage

```javascript
import iteratorStream from 'https://cdn.jsdelivr.net/gh/stdlib-js/streams-node-from-iterator@esm/index.mjs';
```
The previous example will load the latest bundled code from the esm branch. Alternatively, you may load a specific version by loading the file from one of the [tagged bundles](https://github.com/stdlib-js/streams-node-from-iterator/tags). For example,

```javascript
import iteratorStream from 'https://cdn.jsdelivr.net/gh/stdlib-js/streams-node-from-iterator@v0.2.2-esm/index.mjs';
```

You can also import the following named exports from the package:

```javascript
import { factory, objectMode } from 'https://cdn.jsdelivr.net/gh/stdlib-js/streams-node-from-iterator@esm/index.mjs';
```

<a name="iterator-stream"></a>

#### iteratorStream( iterator\[, options] )

Returns a [readable stream][readable-stream] from an [iterator][mdn-iterator-protocol].

```javascript
import inspectStream from 'https://cdn.jsdelivr.net/gh/stdlib-js/streams-node-inspect-sink@esm/index.mjs';
import randu from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-iter-randu@esm/index.mjs';

var iStream;
var stream;

function log( chunk, idx ) {
    console.log( chunk.toString() );
    if ( idx === 10 ) {
        stream.destroy();
    }
}

stream = iteratorStream( randu() );
iStream = inspectStream( log );

stream.pipe( iStream );
```

The function accepts the following `options`:

-   **objectMode**: specifies whether a [stream][stream] should operate in [objectMode][object-mode]. Default: `false`.
-   **encoding**: specifies how `Buffer` objects should be decoded to `strings`. Default: `null`.
-   **highWaterMark**: specifies the maximum number of bytes to store in an internal buffer before pausing iteration.
-   **sep**: separator used to join streamed data. This option is only applicable when a stream is **not** in [objectMode][object-mode]. Default: `'\n'`.
-   **serialize**: custom serialization function. This option is only applicable when a stream is **not** in [objectMode][object-mode].

To set [stream][stream] `options`,

```javascript
import randu from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-iter-randu@esm/index.mjs';

var opts = {
    'objectMode': true,
    'encoding': 'utf8',
    'highWaterMark': 64
};

var stream = iteratorStream( randu(), opts );
```

By default, when not operating in [objectMode][object-mode], a returned [stream][stream] delineates iterated values using a newline character. To specify an alternative separator, set the `sep` option.

```javascript
import inspectStream from 'https://cdn.jsdelivr.net/gh/stdlib-js/streams-node-inspect-sink@esm/index.mjs';
import randu from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-iter-randu@esm/index.mjs';

function log( chunk ) {
    console.log( chunk.toString() );
}

var it = randu({
    'iter': 10
});

var stream = iteratorStream( it, {
    'sep': ','
});

var iStream = inspectStream( log );

stream.pipe( iStream );
```

By default, when not operating in [objectMode][object-mode], a returned [stream][stream] serializes iterated values as JSON strings. To specify custom serialization behavior (either to a `string` or `Buffer`), set the `serialize` option.

```javascript
import inspectStream from 'https://cdn.jsdelivr.net/gh/stdlib-js/streams-node-inspect-sink@esm/index.mjs';
import randu from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-iter-randu@esm/index.mjs';

function serialize( v ) {
    return 'r::' + v.toString();
}

function log( chunk ) {
    console.log( chunk.toString() );
}

var it = randu({
    'iter': 10
});

var stream = iteratorStream( it, {
    'serialize': serialize
});

var iStream = inspectStream( log );

stream.pipe( iStream );
```

* * *

#### iteratorStream.factory( \[options] )

Returns a `function` for creating [readable streams][readable-stream] from [iterators][mdn-iterator-protocol].

```javascript
import randu from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-iter-randu@esm/index.mjs';

var opts = {
    'objectMode': true,
    'encoding': 'utf8',
    'highWaterMark': 64
};

var createStream = iteratorStream.factory( opts );

var stream1 = createStream( randu() );
var stream2 = createStream( randu() );
// ...
```

The method accepts the same `options` as [`iteratorStream()`](#iterator-stream).

* * *

#### iteratorStream.objectMode( iterator\[, options] )

This method is a convenience function to create [streams][stream] which **always** operate in [objectMode][object-mode].

```javascript
import inspectStream from 'https://cdn.jsdelivr.net/gh/stdlib-js/streams-node-inspect-sink@esm/index.mjs';
import randu from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-iter-randu@esm/index.mjs';

function log( v ) {
    console.log( v );
}

var opts = {
    'iter': 10
};
var stream = iteratorStream.objectMode( randu( opts ) );

opts = {
    'objectMode': true
};
var iStream = inspectStream( opts, log );

stream.pipe( iStream );
```

This method accepts the same `options` as [`iteratorStream()`](#iterator-stream); however, the method will **always** override the [`objectMode`][object-mode] option in `options`.

</section>

<!-- /.usage -->

* * *

<section class="notes">

## Notes

-   In [`objectMode`][object-mode], `null` is a reserved value. If an [iterator][mdn-iterator-protocol] generates `null` values (e.g., as a means to encode missing values), the stream will prematurely end. Consider an alternative encoding or explicitly map `null` values to a different value by wrapping the provided [iterator][mdn-iterator-protocol] with another [iterator][mdn-iterator-protocol].
-   In binary mode, if an [iterator][mdn-iterator-protocol] generates `undefined` values, the stream will emit an error. Consider providing a custom serialization function or explicitly map `undefined` values to a different value by wrapping the provided [iterator][mdn-iterator-protocol] with another [iterator][mdn-iterator-protocol].

</section>

<!-- /.notes -->

* * *

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```html
<!DOCTYPE html>
<html lang="en">
<body>
<script type="module">

import inspectStream from 'https://cdn.jsdelivr.net/gh/stdlib-js/streams-node-inspect-sink@esm/index.mjs';
import randu from 'https://cdn.jsdelivr.net/gh/stdlib-js/random-iter-randu@esm/index.mjs';
import iteratorStream from 'https://cdn.jsdelivr.net/gh/stdlib-js/streams-node-from-iterator@esm/index.mjs';

function log( v ) {
    console.log( v.toString() );
}

// Create an iterator which generates uniformly distributed pseudorandom numbers:
var opts = {
    'iter': 10
};
var it = randu( opts );

// Convert the iterator to a stream:
opts = {
    'objectMode': true
};
var stream = iteratorStream( it, opts );

// Create a writable stream for inspecting stream data:
opts = {
    'objectMode': true
};
var iStream = inspectStream( opts, log );

// Begin data flow:
stream.pipe( iStream );

</script>
</body>
</html>
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/streams-node/from-array`][@stdlib/streams/node/from-array]</span><span class="delimiter">: </span><span class="description">create a readable stream from an array-like object.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2024. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/streams-node-from-iterator.svg
[npm-url]: https://npmjs.org/package/@stdlib/streams-node-from-iterator

[test-image]: https://github.com/stdlib-js/streams-node-from-iterator/actions/workflows/test.yml/badge.svg?branch=v0.2.2
[test-url]: https://github.com/stdlib-js/streams-node-from-iterator/actions/workflows/test.yml?query=branch:v0.2.2

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/streams-node-from-iterator/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/streams-node-from-iterator?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/streams-node-from-iterator.svg
[dependencies-url]: https://david-dm.org/stdlib-js/streams-node-from-iterator/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/streams-node-from-iterator/tree/deno
[deno-readme]: https://github.com/stdlib-js/streams-node-from-iterator/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/streams-node-from-iterator/tree/umd
[umd-readme]: https://github.com/stdlib-js/streams-node-from-iterator/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/streams-node-from-iterator/tree/esm
[esm-readme]: https://github.com/stdlib-js/streams-node-from-iterator/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/streams-node-from-iterator/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/streams-node-from-iterator/main/LICENSE

[stream]: https://nodejs.org/api/stream.html

[object-mode]: https://nodejs.org/api/stream.html#stream_object_mode

[readable-stream]: https://nodejs.org/api/stream.html

[mdn-iterator-protocol]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol

<!-- <related-links> -->

[@stdlib/streams/node/from-array]: https://github.com/stdlib-js/streams-node-from-array/tree/esm

<!-- </related-links> -->

</section>

<!-- /.links -->
