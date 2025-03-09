# Node.js Video Streaming Application

A lightweight video streaming application built with raw Node.js, demonstrating how to implement video streaming functionality using only core Node.js modules.

<img title="Node.js video streaming app" alt="node video streaming app" src="https://github.com/nabedkhan/node-video-streaming-app/blob/main/screenshot.png">

## Features

- ✅ Stream video content with adaptive buffering
- ✅ Support for different video formats
- ✅ Range requests support for seeking within videos
- ✅ Simple and clean HTML5 video player interface
- ✅ Built with zero external dependencies
- ✅ Demonstrates core Node.js concepts like streams and file system operations

## Technologies Used

- **Node.js**: Core runtime environment
- **Core Node.js Modules**:
  - `fs`: File system operations for reading video files
  - `http`: Creating HTTP server to handle requests
  - `path`: Working with file and directory paths
  - `url`: Parsing URL parameters
  - `stream`: Handling streaming data
- **HTML5**: Frontend video player interface

## How It Works

This application demonstrates several important concepts:

1. **HTTP Range Requests**: Supports partial content delivery allowing users to seek within videos
2. **Streaming**: Uses Node.js streams to efficiently transfer video data
3. **Content-Type Detection**: Sets appropriate MIME types based on video file extensions
4. **Error Handling**: Gracefully handles missing files and invalid requests

## Project Setup

### Prerequisites

- Node.js (v14 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/nabedkhan/node-video-streaming-app.git
   cd node-video-streaming-app
   ```

2. Start the server:
   ```
   node app.mjs
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## How to Add Your Own Videos

1. Place your video files in the `videos` directory
2. Update the video source in `index.html` if needed
3. Restart the server

## Technical Implementation

The application works by:

1. Creating an HTTP server using the `http` module
2. Parsing incoming request URLs to determine the requested video
3. Reading video file stats to get file size
4. Supporting range requests to allow video seeking
5. Streaming video data in chunks using `fs.createReadStream()`
6. Setting appropriate HTTP headers for content type and length

## Learning Outcomes

This project demonstrates:
- How to implement video streaming without external libraries
- Working with Node.js Buffer and Stream APIs
- Handling HTTP headers for content streaming
- Basic understanding of video delivery concepts

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Nabed Khan - [GitHub Profile](https://github.com/nabedkhan)
