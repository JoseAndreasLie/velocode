const { exec } = require('child_process');

/**
 * POC: Burn a title into a video for the first 2 seconds
 * @param {string} input - Path to your source video
 * @param {string} output - Path for the rendered video
 * @param {string} title - The text you want to display
 */
function generateVideo(input, output, title) {
    // FFmpeg Logic:
    // 1. drawtext: The filter to render text
    // 2. enable='between(t,0,2)': Shows text only between 0 and 2 seconds
    // 3. h264_videotoolbox: Uses your M4 Pro hardware acceleration
    
    const ffmpegCommand = `ffmpeg -i ${input} -vf \
        "drawtext=text='${title}':fontcolor=yellow:fontsize=80:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,0,3)':box=1:boxcolor=0x000000@0.5:boxborderw=10:fontfile=Arial-Bold:bordercolor=black:borderw=2:shadowcolor=black:shadowx=2:shadowy=2" \
        -c:v h264_videotoolbox \
        -b:v 6000k \
        ${output} -y`;

    console.log("Starting render...");

    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        console.log(`Render Complete! Saved to: ${output}`);
    });
}

// Run the POC
generateVideo('input.mp4', 'output_with_title.mp4', 'MIE PETAK EMPAT LIMA');