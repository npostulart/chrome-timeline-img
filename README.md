# Convert Chrome Timeline with Snapshots to Images

Chrome can create snapshots in the timeline that are sometimes useful for presentation or anything else, but unfortunately there is no option to save this images on your hard drive.

With this tool you can export the timeline JSON file to your hard drive and extract those images easily.


## Installation

Install the package globally with

```
npm install -g chrome-timeline-img
```

## Usage

Just start it with

```
chrome-timeline-img TIMELINEFILE.json
```

and it will create a folder with the name of the file and add all snapshots included to the folder.

```

  Usage: chrome-timeline-img [options] <file> [otherFiles...]

  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -f, --filename [value]  Base filename for Snapshots [default: snapshot_]

```

## Options

* `-f`: Set a different filename prefix for output files, defaults to `snapshot_`

## Example

```
chrome-timeline-img TimelineRawData-20151028T131921.json
```

creates

```
TimelineRawData-20151028T131921
-- snaps_0000.png
-- snaps_0017.png
-- snaps_0034.png
-- snaps_0061.png
-- snaps_0092.png
-- snaps_0104.png
-- snaps_0220.png
-- snaps_0235.png
-- snaps_0274.png
-- snaps_0528.png
-- snaps_0571.png
-- snaps_1534.png
```

## ToDo

- [ ] optimize `mkdirP` function
- [ ] remove console.log from lib files
- [ ] create files async (promises)

## License

The MIT License (MIT)

Copyright (c) 2015 Niklas Postulart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
